import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "indexCol", "showCol" , "tableBody" ]

  connect() {
    console.log("Hello From Dropzone Controller")
    this.files = []
    this.doIndexColHtml()
    this.doShowColHtml()
  }

  doIndexColHtml() {
    var html =  `<div>
                  <input class="file-input" type="file" id="dropzoneArea" multiple data-action="change->dropzones--entities--index#dropHandler"></input>
                  <label class="drop-area" for="dropzoneArea" data-action="dragover->dropzones--entities--index#dragOverHandler drop->dropzones--entities--index#dropHandler">
                    <p>Drag one or more files to this Drop Zone ...</p>
                  </label>
                </div>`
    
    this.indexColTarget.insertAdjacentHTML("beforeend", html)
  }

  doShowColHtml() {
    var html =  `<table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col-md-4">Nome</th>
                      <th scope="col-md-1">Tamanho</th>
                      <th scope="col-md-1">Tipo</th>
                    </tr>
                  </thead>
                  <tbody data-target="dropzones--entities--index.tableBody">
                  </tbody>
                </table>`
    
    this.showColTarget.insertAdjacentHTML("beforeend", html)
  }

  dragOverHandler(ev) {
    console.log('File(s) in drop zone'); 
  
    // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    ev.preventDefault();
  }

  dropHandler(ev) {
    
    // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    ev.preventDefault();
    
    if (ev.type == "drop") {

      console.log('File(s) dropped');

      if (ev.dataTransfer.items) {
        
        // Use a interface DataTransferItemList para acessar o (s) arquivo (s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          
          // Se os itens soltos não forem arquivos, rejeite-os
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
            this.files[this.files.length] = file
          }
        }
      } else {
        
        // Use a interface DataTransfer para acessar o (s) arquivo (s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
      }
    } else if (ev.type == "change") {

      console.log('File(s) inputed');

      // Use a interface Files para acessar o (s) arquivo (s)
      for (var i = 0; i < ev.target.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.target.files[i].name);
        this.files[this.files.length] = ev.target.files[i]
      }
    }

    this.doBodyHtml()
  }

  doBodyHtml() {
    this.tableBodyTarget.innerHTML = ``
    var html = ``
    this.files.forEach(element => {
      html =  `<tr>
                <td col-md-4>${element.name}</td>
                <td col-md-1>${(element.size / 1000000).toFixed(2)}MB</td>
                <td col-md-1  >.${element.type.split("/")[1]}</td>
              </tr>`
      
      this.tableBodyTarget.insertAdjacentHTML("beforeend", html)
    });

  }


}