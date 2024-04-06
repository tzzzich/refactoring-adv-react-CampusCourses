import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const RichTextFormControl = ({ controlId, label, required, validated }) => {
    const [editorData, setEditorData] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        setIsValid(data.trim().length > 0); 
    };

    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
            />
            <Form.Control
                as="textarea"
                rows={6}
                value={editorData}
                onChange={(e) => setEditorData(e.target.value)}
                style={{ display: 'none' }}
            />
            <Form.Control.Feedback type="invalid">
                Please provide a valid text.
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default RichTextFormControl;