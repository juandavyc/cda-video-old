class HelixConfirm {
    constructor({
        title = null,
        icon = null,
        content = null,
        type = null,
        size = 'md',
        buttons = []
    }) {

        this.modal = document.createElement('div');
        this.modalDialog = document.createElement('div');
        this.modalContent = document.createElement('div');
        this.modalHeader = document.createElement('div');
        this.modalTitle = document.createElement('h4');
        this.modalIcon = document.createElement('i');
        this.closeButton = document.createElement('button');
        this.modalBody = document.createElement('div');
        this.modalFooter = document.createElement('div');

        this.init(
            this.modal,
            this.modalDialog,
            this.modalContent,
            this.modalHeader,
            this.modalTitle,
            this.modalIcon,
            this.modalBody,
            this.closeButton,
            this.modalFooter
        );

        this.modalInstance = new bootstrap.Modal(this.modal);



        this.setIcon('fa-clock');
        this.setSize('sm');
        this.setType(type);

        this.modal.addEventListener('shown.bs.modal', () => {

            this.setIcon(icon);
            this.setTitle(title);
            this.setContent(content);

            this.modalHeader.classList.remove('modal-sm');
            this.setSize(size);
            this.setButtons(buttons);

        });

        this.modal.addEventListener('hidden.bs.modal', () => {
            this.destroy();
        });

        this.modalInstance.show();
    }

    init(modal, modalDialog, modalContent, modalHeader, modalTitle, modalIcon, modalBody, closeButton, modalFooter) {
        modal.className = 'modal fade ';
        modal.tabIndex = '-1';

        modal.setAttribute('aria-labelledby', 'exampleModalTitle');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('data-bs-backdrop', 'static');
        modal.setAttribute('data-bs-keyboard', 'true');

        modalDialog.className = 'modal-dialog modal-dialog-centered modal-dialog-scrollable';
        modalContent.className = 'modal-content ';
        modalHeader.className = 'modal-header p-2 d-none';

        modalTitle.className = 'modal-title fw-bold';

        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');

        modalHeader.appendChild(modalIcon);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        modalBody.className = 'modal-body overflow-auto';
        modalFooter.className = 'modal-footer py-1 bg-body-tertiary d-none';

        modalTitle.textContent = 'Cargando';

        modalBody.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);

        modal.appendChild(modalDialog);

        // Agregar el modal al documento
        document.body.appendChild(modal);
    }

    setTitle(title) {
        if (typeof title !== 'undefined' && title !== null) {
            this.modalTitle.textContent = title;
        }
    }
    setIcon(icon) {
        if (typeof icon !== 'undefined' && icon !== null) {
            this.modalIcon.classList.add('fas', icon, 'fa-lg', 'text-body-tertiary', 'me-2');
        }
    }

    setType(type) {
        if (typeof type !== 'undefined' && type !== null) {
            this.modalContent.classList.add('border-2', `border-${type}`);
        }
    }
    setSize(size) {
        this.modalDialog.classList.add(`modal-${size}`);
    }

    setButtons(buttons) {
        if (Object.keys(buttons).length === 0) {
            const btn = document.createElement('button');
            btn.textContent = 'Aceptar';
            btn.classList.add('btn', 'btn-secondary');
            btn.addEventListener('click', () => {
                this.close();
            });
            this.modalFooter.appendChild(btn);
        } else {
            Object.entries(buttons).forEach(([key, button]) => {
                if (button.title && button.class) {
                    const btn = document.createElement('button');
                    btn.textContent = button.title;
                    btn.classList.add('btn', `btn-${button.class}`, 'btn-lg');
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (typeof button.action !== 'function' || button.action.toString().trim() === '') {
                            this.close();
                        } else {
                            button.action();
                            this.modalInstance.hide()
                        }
                    });
                    this.modalFooter.appendChild(btn);
                }
            });
        }

    }

    setContent(content) {
        if (typeof content === 'function') {
            const callbackAwait = async () => {
                try {
                    await content(this);
                    console.log("done");
                    this.modalHeader.classList.remove('d-none');
                    this.modalFooter.classList.remove('d-none');
                } catch (error) {
                    console.error('Error durante callback:', error);
                }
            }           
            callbackAwait();
        }
        else {
            this.modalBody.textContent = content;
            this.modalHeader.classList.remove('d-none');
            this.modalFooter.classList.remove('d-none');
        }


    }

    setAppendChild(content) {
        this.modalBody.appendChild(content);
    }

    open() {
        this.modalInstance.show();
    }

    close() {
        this.modalInstance.hide();
    }

    destroy() {
        this.modalInstance.dispose();
        this.modal.parentNode.removeChild(this.modal);
    }
}

const hxConfirm = function (options) {
    const instance = new HelixConfirm(options);
    if (typeof options.content === 'function') {
        options.content = options.content.bind(instance); // Bind the content function to the instance of HelixConfirm
    }

    return instance;
};