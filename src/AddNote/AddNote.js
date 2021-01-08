import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import ValidationError from '../ValidateName/ValidationError'

export default class AddNote extends React.Component {
    static defaultProps = {
        history: {
            push: () => { }
        },
    }

    static contextType = ApiContext;

    state = {
        name: {
            value: '',
            touched: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            name: {value: e.target['note-name'].value, touched: true}
        })
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
        }
        if (newNote.name.split('').length > 0) {
            fetch(`${config.API_ENDPOINT}/notes`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newNote),
            })
            .then(res => {
                if (!res.ok)
                    return res.json().then((e) => Promise.reject(e))
                return res.json()
            })
            .then(note => {
                this.context.addNote(note)
                this.props.history.push(`/folder/${note.folderId}`)
            })
            .catch(error => {
                console.error({error})
            })
        }  
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }

    render() {
        const { folders=[] } = this.context
        return (
            <section className='AddNote'>
                <h2>Create Note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                            Name:
                        </label>
                        <input type='text' id='note-name-input' name='note-name' />
                    </div>
                    {this.state.name.touched && (
                        <ValidationError message={this.validateName()} />
                    )}
                    <div className='field'>
                        <label htmlFor='note-content-input'>
                            Content:
                        </label>
                        <textarea id='note-content-input' name='note-content' />
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Select Folder:
                        </label>
                        <select id='note-folder-select' name='note-folder-id'>
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='buttons'>
                        <button type='submit'>
                            Add note
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}
