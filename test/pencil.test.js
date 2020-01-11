import { expect, assert } from 'chai';
import { Pencil } from '../src/pencil';

describe('tests for PENCIL module', function () {
    var pencil_one = new Pencil(12);
    it('pencil takes a parameter for point durability and can return it', function() {
        expect(pencil_one.getPointDurability(), '12');
    });
    it('writing with "" with the pencil does not decrease pencil durability', function(){
        pencil_one.write("");
        assert(pencil_one.getPointDurability(), '12');
    });
});