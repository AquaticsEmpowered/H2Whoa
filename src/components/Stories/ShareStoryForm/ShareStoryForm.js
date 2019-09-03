import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShareStoryForm extends Component {




    render() {
        return (
            <>
                <h3>Share your aquatic therapy story below!</h3>
                    <div>
                        <p>*What's your name?</p>
                        <input required placeholder="Name"
                        onChange={(event) => this.handleChangeFor('name', event)} />

                        <p>*Where do you live?</p>
                        <input required placeholder="Location"
                        onChange={(event) => this.handleChangeFor('location', event)} />

                        <p>*Give your story a title!</p>
                        <input required placeholder="Title"
                        onChange={(event) => this.handleChangeFor('title', event)} />

                        <p>Want to share the name of your therapist?</p>
                        <input placeholder="Therapist"
                        onChange={(event) => this.handleChangeFor('aquatic_therapist', event)} />

                        <p>*Please share your story.</p>
                        <textarea rows="4" cols="40" id="add-bar-input" required placeholder="Share your story!"
                        onChange={(event) => this.handleChangeFor('notes', event)} maxLength="200" />

                        <p>Share images of your story?</p>
                        <input placeholder="Images go here"
                        onChange={(event) => this.handleChangeFor('phone', event)} />
                        <button>
                            Submit Story
                        </button>
                </div>
            </>
        )
    }
}

export default connect()(ShareStoryForm);
