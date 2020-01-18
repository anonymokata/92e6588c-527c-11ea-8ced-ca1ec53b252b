import { Passphrase } from './passphrase';

class Paper {
    constructor() {
        this.text = '';
        this.text_vacancies = [];
    }

    getText() {
        return this.text;
    }

    getVacancies() {
        return this.text_vacancies;
    }

    addText(text_to_add, passphrase) {
        if(!(passphrase instanceof Passphrase)) {
            return;
        }
        this.text += text_to_add;
    }

    clear() {
        this.text = '';
    }

    eraseText(text_to_erase, passphrase) {
        if(!(passphrase instanceof Passphrase) || this.text.indexOf(text_to_erase) < 0) {
            return;
        }
        const erase_index = this.text.lastIndexOf(text_to_erase);
        const erase_text_length = text_to_erase.length;
        const remaining_text = this.text.substring(0, erase_index) + ' '.repeat(erase_text_length) + this.text.substring(erase_index+erase_text_length);
        this.text = remaining_text;
        this.text_vacancies.push([erase_index, erase_text_length]);
    }

    editText(edit_text, passphrase) {
        var vacancies = this.text_vacancies;
        if(vacancies.length == 0) {
            return;
        }
        const first_vacancy = this.text_vacancies[0];
        const text_after_edit = edit_text + this.text.substring(first_vacancy[0]+1);

        this.text = text_after_edit;

    }
}

export {
    Paper
}