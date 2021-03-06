import { Passphrase } from './passphrase'

class Pencil {
    constructor(input_point_durability = 10, input_pencil_length = 1, input_eraser_durability = 10) {
        this.point_durability = this.original_point_durability = input_point_durability;
        this.pencil_length = input_pencil_length;
        this.eraser_durability = input_eraser_durability;
        this.passphrase = new Passphrase;
    }

    getPointDurability() {
        return this.point_durability;
    }

    getLength() {
        return this.pencil_length;
    }

    getEraserDurability() {
        return this.eraser_durability;
    }

    write(text_to_write, paper_to_write_on) {
        const amount_to_reduce_length = calculatePointDurabilityReduction(text_to_write);
        var new_point_durability = (this.point_durability - amount_to_reduce_length);
        var text_that_can_be_written = text_to_write;
        if(new_point_durability < 0) {
            new_point_durability = 0;
            text_that_can_be_written = findWhatCanBeWritten(text_to_write, this.point_durability);
        }

        this.point_durability = new_point_durability;
        paper_to_write_on.addText(text_that_can_be_written, this.passphrase);
    }

    sharpen() {
        if(this.pencil_length == 0){
            return;
        }
        this.point_durability = this.original_point_durability;
        this.pencil_length--;
    }

    erase(text_to_erase, paper_to_erase_from) {
        if(text_to_erase == ' ' || paper_to_erase_from.getText().indexOf(text_to_erase) < 0) {
            return;
        }
        const no_space_text_length = text_to_erase.replace(/\s/g, "").length;
        var new_eraser_durability = (this.eraser_durability - no_space_text_length);
        var text_that_can_be_erased = text_to_erase;
        if(new_eraser_durability < 0) {
            new_eraser_durability = 0;
            var char_diff = text_to_erase.length - this.eraser_durability;
            text_that_can_be_erased = text_to_erase.substring(char_diff);
        }
        
        this.eraser_durability = new_eraser_durability;
        paper_to_erase_from.eraseText(text_that_can_be_erased, this.passphrase);
    }

    edit(edit_text, paper_to_edit) {
        if(paper_to_edit.getVacancies().length == 0) {
            return;
        }
        const amount_to_reduce_length = calculatePointDurabilityReduction(edit_text);
        var new_point_durability = (this.point_durability - amount_to_reduce_length);
        var edit_text_that_can_be_written = edit_text;
        if(new_point_durability < 0) {
            new_point_durability = 0;
            edit_text_that_can_be_written = findWhatCanBeWritten(edit_text, this.point_durability);
        }
        
        this.point_durability = new_point_durability;
        paper_to_edit.editText(edit_text_that_can_be_written, this.passphrase);
    }
}

function calculatePointDurabilityReduction(text_to_write) {
    const number_of_caps = text_to_write.replace(/[^A-Z]/g,"").length;
    const no_space_text_length = text_to_write.replace(/\s/g, "").length;

    return no_space_text_length + number_of_caps;
}

function findWhatCanBeWritten(text_to_write, text_cost) {
    
    var text_that_can_be_written_length = 0;
    const text_length = text_to_write.length;
    var text_index = 0;
    while((text_cost > 0 && text_length > text_index) || text_to_write[text_index] == " "){
        var text_char = text_to_write[text_index];
        if (text_char == " "){
            
        }
        else if (text_char.toUpperCase() == text_char) {
            text_cost -= 2;
        }
        else { text_cost--;}
        text_that_can_be_written_length++;
	    text_index++;
    }
    return text_to_write.substr(0, text_that_can_be_written_length);
}

export {
    Pencil
}