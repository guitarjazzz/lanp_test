// @flow
import React from 'react';
import placeholder from './img/company_logo.svg';


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: placeholder
        }
        this.allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
        
    }
    isAllowedType = (fileType: string) => this.allowedFileTypes.find(el => el === fileType);
    onChange = (event) => {
        const file = event.target.files[0];
        this.errorHandler(file, () => {
            this.getBase64(file, this.drawPicture);
        } );
    }
    errorHandler = (file, success) => {
        if(this.isAllowedType(file.type)) {
            success();
        } else {
            alert(`Please upload the following image format: \n * ${this.allowedFileTypes.join('\n * ')}`)
        }
    }
    drawPicture = (base64) => {
        this.setState({
            url: base64
        })
    }
    getBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    
    onDrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.dataTransfer.items[0].getAsFile();
        this.errorHandler(file, () => {
            this.getBase64(file, this.drawPicture);
        } );
    }
    onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }
    render() {
        return (
            <main className="Main">
                <div
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                className="DraggableArea">
                    <div className="DraggableArea-Bg">
                        <img ref={this.imgRef} className="DraggableArea-Logo" src={this.state.url}/>
                    </div>
                    <p className="DraggableArea-Text">
                        <span className="DraggableArea-Text-Top">Drag & drop here</span>
                        <span className="DraggableArea-Text-Divider">- or -</span>
                        <label htmlFor="fileUpload" className="DraggableArea-Link">Select file to upload</label>
                        <input type="file" id="fileUpload" className="DraggableArea-Input" onChange={this.onChange}/>
                    </p>
                </div>
            </main>
        );
    }
}