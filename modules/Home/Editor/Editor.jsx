import React, { Component } from 'react'

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import $ from 'jquery';
window.$ = $;

export default class Editor extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       model: ''
    }
    this.config= {
      placeholderText: 'Escribe o pega el contenido a analizar',
      charCounterCount: true
    }
  }
  
  handleModelChange = (model) => {
    console.log(model)
    this.setState({
      model: model
    });
  }
  render() {
    return (
      <FroalaEditor
              model={this.state.model} //If I put strings looks like it convert them to html
              onModelChange={this.handleModelChange} // a model in html is produced  here
              config={this.config}
           />
    )
  }
}


