import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Form, Select, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ShareStoryForm.css';
import Swal from 'sweetalert2';
import axios from 'axios';

class ShareStoryForm extends Component {

    // Constructor for ReactQuill, needed for Rich Text Editor in form
    constructor(props) {
        super(props)
        this.quillRef = null; // Quill instance
        this.reactQuillRef = null; // ReactQuill component
        this.state = {
            name: '',
            location: '',
            title: '',
            aquatic_therapist: '',
            message: '',
            email: '',
            category_id: 0,
            flagged: false,
            selectedFile: '',
        }
    }

    // Needed for Rich Text Editor
    componentDidMount() {
        this.attachQuillRefs();
        this.props.dispatch({
            type: 'FETCH_VISIBLE_CATEGORIES'
        });
    }

    // Needed for Rich Text Editor
    componentDidUpdate() {
        this.attachQuillRefs();
    }

    // Needed for Rich Text Editor
    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    // Sets message property in state 
    handleMessageChange = () => {
        const editor = this.reactQuillRef.getEditor();
        const unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(editor);
        this.setState({
            ...this.state,
            message: unprivilegedEditor.getHTML()
        })
    }


    // This method sets our state through the form below
    handleChangeFor = (propertyName, event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }

    // Sets the category_id property of state
    handleCategoryChange = (e, { value }) => {
        this.setState({
            ...this.state,
            category_id: value
        })
    }

    // When user clicks submit, sends a payload of our state to the Saga with the ADD_STORY action, ultimately resulting
    // in a POST. Then reset the fields of our form so they're blank.
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_STORY',
            payload: this.state,
        })
        this.setState({
            name: '',
            location: '',
            title: '',
            aquatic_therapist: '',
            message: '',
            email: '',
            category_id: 0,
            flagged: false,
        })
        Swal.fire({
            title: 'Awesome!',
            text: 'Thank you for sharing your story with us! Click the button below to check it out.',
            type: 'success',
            confirmButtonText: 'Go to Stories'
        }).then((result) => {
            if (result.value) {
                this.props.history.push('/stories');
            }
        });
    }

    getPresignedPUTURL = (event) => {
        const selectedFile = event.target.files[0];
        axios.get(`/api/aws/presignedPUTURL/${selectedFile.name}`).then(result =>
            this.uploadSingleFile(result.data, selectedFile),
            // axios.put(result.data, selectedFile)
            // console.log('successful put'),
            this.getPresignedGETURL(selectedFile)
        ).catch(error => {
            console.log('error with getting presignedPUTURL', error);
        });
    };

    uploadSingleFile = (putURL, file) => {
        axios.put(putURL, file);
    }

    getPresignedGETURL = (file) => {
        console.log(file);
        axios.get(`/api/aws/presignedGETURL/${file.name}`).then(result => {
            this.setState({
                ...this.state,
                getUrl: result.data
            })
        }).catch(error => {
            console.log('error with getting presignedGETURL', error);
        });
    }

    displayImage = () => {
        if (this.state.getUrl) {
            // console.log(this.state.getUrl);
            return (
                <img className="" src={this.state.getUrl} alt={this.state.selectedFile.name} />
            );
        }
    }

    render() {
        console.log(this.state);
        // Creates categories array that populates the select field in the form.
        const categories = []
        this.props.reduxStore.categories.categoriesReducer.map(category => {
            return categories.push({ text: category.category, value: category.id })
        })

        return (
            <div className="form-container">
                <h3>Share your aquatic therapy story below!</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input label="What's your name?" required placeholder="Name" width={4}
                            onChange={(event) => this.handleChangeFor('name', event)}
                            value={this.state.name} />
                        <Form.Input label="Where do you live?" required placeholder="Location" width={8}
                            onChange={(event) => this.handleChangeFor('location', event)}
                            value={this.state.location} />
                        {/* Select field that uses the categories variable above for the options */}
                        <Form.Field placeholder="Category" control={Select} required label="Choose a category"
                            options={categories} onChange={this.handleCategoryChange} width={4} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Give your story a title." required placeholder="Title" width={8}
                            onChange={(event) => this.handleChangeFor('title', event)}
                            value={this.state.title} />
                        <Form.Input label="Want to share the name of your therapist?" placeholder="Therapist" width={8}
                            onChange={(event) => this.handleChangeFor('aquatic_therapist', event)}
                            value={this.state.aquatic_therapist} />
                    </Form.Group>
                    {/* Rich Text Editor input field */}
                    <Form.Field required label="Share your story!" />
                    <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        theme={'snow'}
                        preserveWhitespace={true}
                        value={this.state.message}
                        indent
                        onChange={() => this.handleMessageChange()} />
                    {/* <Form.Input label="Share images of your story?" placeholder="Images go here"
                        onChange={(event) => this.handleChangeFor('images', event)} /> */}
                    <label>Upload an Image:</label>
                    <input type="file" onChange={this.getPresignedPUTURL} />
                    {this.displayImage()}
                    {/* <button className="ui button" onClick={this.getPresignedPUTURL}>Upload</button> */}
                    <br />
                    <a href="http://www.google.com">Picture Terms and Conditions</a>
                    <br />
                    <Checkbox label="I agree to share my images on H2Whoa!" />
                    <br />
                    <Form.Input placeholder="E-mail Address" label="Sign up for our newsletter?" width={4}
                        onChange={(event) => this.handleChangeFor('email', event)}
                        value={this.state.email} />
                    <Button primary>
                        Submit
                    </Button>
                    <p>* indicates a required field</p>
                </Form>
            </div>
        ) // End Return
    } // End Render
} // End Class

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(ShareStoryForm);
