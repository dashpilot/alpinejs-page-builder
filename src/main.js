import Alpine from 'alpinejs';
window.Alpine = Alpine;

import { template as iconPickerTemplate, IconPicker } from './generated/IconPicker.js';
import { template as editorTemplate, myEditor } from './generated/Editor.js';

document.addEventListener('alpine:init', () => {
    Alpine.store('editor', {
        isOpen: false,
        curId: false,
        curIndex: false,
        curFields: [],
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
    });

    Alpine.data('IconPicker', IconPicker);
    Alpine.data('myEditor', myEditor);
});

document.querySelector('#app').innerHTML += editorTemplate;

document.addEventListener('click', function (event) {
    if (event.target.closest('[data-edit]')) {
        let el = event.target.closest('[data-edit]');
        let id = el.getAttribute('data-edit');
        console.log(id);

        Alpine.store('editor').curId = event.target.getAttribute('data-edit');
        Alpine.store('editor').isOpen = true;
        Alpine.store('editor').curIndex = Alpine.store('app').data.posts.findIndex((x) => x.id == id);

        Alpine.store('editor').curFields = el.getAttribute('data-fields').split(',');

        setTimeout(() => {
            if (document.querySelector('#rte-body')) {
                document.querySelector('#rte-body').innerHTML = Alpine.store('app').data.posts[Alpine.store('editor').curIndex].body;
            }
            if (document.querySelector('#icon-picker')) {
                document.querySelector('#icon-picker').innerHTML = iconPickerTemplate;
            }
        }, 10);
    }
});

Alpine.start();
