import { expect, assert } from 'chai';
import { Paper } from '../src/paper';
import { Passphrase } from '../src/passphrase';

describe('tests for Paper module', function () {
    var sheet_one = new Paper();
    var passphrase = new Passphrase();
    describe('Paper methods that don\'t require a Pencil Passphrase', function () {
        it('//Depricated removed newPage() method// Assigning PAPER.newPage() assigns an object of type Paper', function () {
            assert(sheet_one instanceof Paper);
        });
        it("Calling Paper's method 'getText' returns a string", function () {
            expect(sheet_one.getText()).to.be.a('string');
        });
        describe('tests for clear() method', function () {
            it('clear() returns written text back to ""', function () {
                sheet_one.addText('Hello World', passphrase);
                sheet_one.clear();
                assert.equal(sheet_one.getText(), '');
            });
        });
    });
    describe('Paper methods that require a Pencil Passphrase', function () {
        beforeEach(function () {
            sheet_one = new Paper();
        });
        describe('tests for addText', function () {
            it('addText adds the given text to the sheet, and getText returns updated value', function () {
                sheet_one.addText('Hello', passphrase);
                assert.equal(sheet_one.getText(), 'Hello');
            });
            it('addText without a non-passphrase object returns empty', function () {
                sheet_one.addText('Hello', '');
                assert.equal(sheet_one.getText(), '');
            });
            it('if there is already text on the paper, addText appends the new text to the current text', function () {
                sheet_one.addText('Hello', passphrase);
                sheet_one.addText(' World!', passphrase);
                assert.equal(sheet_one.getText(), 'Hello World!');
            });
        });
        describe('tests for eraseText', function () {
            beforeEach(function () {
                sheet_one.addText('Hello World! Hello', passphrase);
            });
            it('passing a single character that is on the paper, removes the right most occurrence of that text', function () {
                sheet_one.eraseText('o', passphrase);
                assert.equal(sheet_one.getText(), 'Hello World! Hell ');
            });
            it('passing a text value not contained on the paper erases nothing', function () {
                sheet_one.eraseText('cats', passphrase);
                assert.equal(sheet_one.getText(), 'Hello World! Hello');
            });
            it('passing text to eraseText that is on paper removes the right most occurrence of that full text', function () {
                sheet_one.eraseText('Hello', passphrase);
                assert.equal(sheet_one.getText(), 'Hello World!      ');
            });
            it('passing the same text more than once erases that text one instance at a time right-to-left', function () {
                sheet_one.eraseText('o', passphrase);
                sheet_one.eraseText('o', passphrase);
                assert.equal(sheet_one.getText(), 'Hello W rld! Hell ');
            });
        });
        describe('tests for editText', function () {
            beforeEach(function () {
                sheet_one = new Paper();
                sheet_one.addText('Hello World', passphrase);
            });
            it('when nothing is erased from the paper, do not change the text', function() {
                sheet_one.editText('edited', passphrase);
                assert.equal(sheet_one.getText(), 'Hello World');
            });
            it('locations that have been erased and their length can be retrieved from a paper instance', function() {
                sheet_one.eraseText('H', passphrase);
                assert.deepEqual(sheet_one.getVacancies()[0], [0, 1]);
            });
            it('given a vacancy at the start of the paper text, edit replaces that starting character', function() {
                sheet_one.eraseText('H', passphrase);
                sheet_one.editText('Y', passphrase);
                assert.equal(sheet_one.getText(), 'Yello World');
            });
            it('given a single character vacancy in the center of the paper text, edit replaces that character', function() {
                sheet_one.eraseText('r', passphrase);
                sheet_one.editText('u', passphrase);
                assert.equal(sheet_one.getText(), 'Hello Would');
            });
            it('given multiple erases, edit writes in the left-most vacancy', function() {
                sheet_one.eraseText('o', passphrase);
                sheet_one.eraseText('H', passphrase);
                sheet_one.editText('Y', passphrase);
                assert.equal(sheet_one.getText(), 'Yello W rld');
            });
            it('editing text when we no longer have vacancies changes nothing', function() {
                sheet_one.eraseText('Hello', passphrase);
                sheet_one.editText('Yello', passphrase);
                sheet_one.editText('Nothing', passphrase);
                assert.equal(sheet_one.getText(), 'Yello World');
            });
            it('given a string of characters longer than the vacancy, edit overwrites the overlap with "@"', function () {
                sheet_one.eraseText('ell', passphrase);
                sheet_one.editText('ippy', passphrase);
                assert.equal(sheet_one.getText(), 'Hipp@ World');
            });
            it('given an edit string longer than the vacancy that spans over natural spaces in text, edit characters fill paper spaces', function() {
                sheet_one.eraseText('ell', passphrase);
                sheet_one.editText('ipper', passphrase);
                assert.equal(sheet_one.getText(), 'Hipp@rWorld');
            })
        });
    });
});