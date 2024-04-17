import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const RichTextFormControl = ({ controlId, label, defaultValue}) => {
    const [editorData, setEditorData] = useState(defaultValue);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <CKEditor
                    editor={ ClassicEditor }
                    onChange={ handleEditorChange}
                    data={defaultValue}
                />
            <Form.Control
                type='hidden'
                name={controlId}
                value={editorData}
                required
            />
             <Form.Control.Feedback type="invalid">
                Поле не может быть пустым.
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default RichTextFormControl;