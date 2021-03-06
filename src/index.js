import { Paper } from './paper.js';
import { Pencil } from './pencil.js';

$('document').ready(function () {
    const paperRef = {'Paper 1' : '.initial-paper', 'Paper 2' : '.second-paper'}
    var pencilNumber = 1;
    var pencils = {};
    var paper = {'Paper 1': new Paper()};

    function createPencil() {
        const pointDurability = (Math.round(Math.random() * 100) % 20) + 1;
        const eraserDurability = (Math.round(Math.random() * 100) % 20) + 1;
        const pencilLength = (Math.round(Math.random() * 10) % 3) + 1;
        $('.table tbody').append('<tr value="'+pencilNumber+'"><td>' + pencilNumber + '</td>' +
            '<td class="PD">' + pointDurability + '</td>' +
            '<td class="ED">' + eraserDurability + '</td>' +
            '<td class="PL">' + pencilLength + '</td></tr>'
        );
        $('.dropdown-menu.pencil').append('<a class="dropdown-item" onclick="$(\'.dropdown-toggle.pencil\').text(\'Pencil ' + pencilNumber + '\');" href="#">Pencil ' + pencilNumber + '</a>');
        pencils['Pencil '+pencilNumber] = new Pencil(pointDurability, pencilLength, eraserDurability);
        pencilNumber++;
    }

    function createPaper() {
        if(Object.keys(paper).length == 2) {
            return;
        }
        $('.initial-paper').css('width', '50%');
        $('.second-paper').css('width', '50%');
        paper['Paper 2'] = new Paper();
        $('.paper-2').toggle();
    }

    function updatePencilTable(value, pencil) {
        const updateTr = 'tr[value="'+value+'"]';
        $('.PD', updateTr).text(pencil.getPointDurability());
        $('.ED', updateTr).text(pencil.getEraserDurability());
        $('.PL', updateTr).text(pencil.getLength());
    }

    function write() {
        if($('.dropdown-toggle.pencil').text().trim() == '-Select a Pencil-') {
            return;
        }
        const pencilToUse = pencils[$('.dropdown-toggle.pencil').text().trim()];
        const paperToUse = paper[$('.dropdown-toggle.paper').text().trim()];
        const paperToUpdate = paperRef[$('.dropdown-toggle.paper').text().trim()];
        const textToWrite = $('input').val();
        pencilToUse.write(textToWrite, paperToUse);

        $('PRE', paperToUpdate).text(paperToUse.getText());
        updatePencilTable($('.dropdown-toggle.pencil').text().trim()[$('.dropdown-toggle.pencil').text().length-1], pencilToUse);
    }

    function erase() {
        if($('.dropdown-toggle.pencil').text().trim() == '-Select a Pencil-') {
            return;
        }
        const pencilToUse = pencils[$('.dropdown-toggle.pencil').text().trim()];
        const paperToUse = paper[$('.dropdown-toggle.paper').text().trim()];
        const paperToUpdate = paperRef[$('.dropdown-toggle.paper').text().trim()];
        const textToErase = $('input').val();
        pencilToUse.erase(textToErase, paperToUse);
        $('PRE', paperToUpdate).text(paperToUse.getText());
        updatePencilTable($('.dropdown-toggle.pencil').text().trim()[$('.dropdown-toggle.pencil').text().length-1], pencilToUse);
    }

    function edit() {
        if($('.dropdown-toggle.pencil').text().trim() == '-Select a Pencil-') {
            return;
        }
        const pencilToUse = pencils[$('.dropdown-toggle.pencil').text().trim()];
        const paperToUse = paper[$('.dropdown-toggle.paper').text().trim()];
        const paperToUpdate = paperRef[$('.dropdown-toggle.paper').text().trim()];
        const textToReplace = $('input').val();
        pencilToUse.edit(textToReplace, paperToUse);
        $('PRE', paperToUpdate).text(paperToUse.getText());
        updatePencilTable($('.dropdown-toggle.pencil').text().trim()[$('.dropdown-toggle.pencil').text().length-1], pencilToUse);
    }

    function sharpen() {
        if($('.dropdown-toggle.pencil').text().trim() == '-Select a Pencil-') {
            return;
        }
        const pencilToUse = pencils[$('.dropdown-toggle.pencil').text().trim()];
        pencilToUse.sharpen();
        updatePencilTable($('.dropdown-toggle.pencil').text().trim()[$('.dropdown-toggle.pencil').text().length-1], pencilToUse);
    }

    function clearPaper() {
        const paperToUse = paper[$('.dropdown-toggle.paper').text().trim()];
        const paperToUpdate = paperRef[$('.dropdown-toggle.paper').text().trim()];
        paperToUse.clear();
        $('PRE', paperToUpdate).text(paperToUse.getText());
    }

    $('.create-pencil-btn').click(function () {
        createPencil();
    });
    $('.create-paper-btn').click(function () {
        createPaper();
    });
    $('.write-btn').click(function () {
        write();
    });
    $('.erase-btn').click(function () {
        erase();
    });
    $('.edit-btn').click(function () {
        edit();
    });
    $('.sharpen-btn').click(function () {
        sharpen();
    });
    $('.clear-btn').click(function () {
        clearPaper();
    });

});