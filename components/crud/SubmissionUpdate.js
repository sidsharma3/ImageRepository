import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleSubmission, updateSubmission } from '../../actions/submission';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';

const SubmissionUpdate = ({ router }) => {
    const [body, setBody] = useState('');
    const [fileDownloadLink, setFileDownloadLink] = useState('');
    const [fileImageLink, setFileImageLink] = useState('');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [previewURL, setPreviewURL] = useState();

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        title: '',
        body: ''
    });

    const { error, success, formData, title } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initSubmission();
        initCategories();
        initTags();
    }, [router]);

    const initSubmission = () => {
        if (router.query.slug) {
            singleSubmission(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data)
                    if (data.fileID && data.fileName){
                        setFileDownloadLink(`https://res.cloudinary.com/dlgtho53p/image/upload/fl_attachment/${data.fileID}/${data.fileName}`)
                        setFileImageLink(`https://res.cloudinary.com/dlgtho53p/image/upload/${data.fileID}/${data.fileName}`)
                    }
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                }
            });
        }
    };

    const setCategoriesArray = submissionCategories => {
        let ca = [];
        submissionCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = submissionTags => {
        let ta = [];
        submissionTags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input
                        onChange={handleToggle(c._id)}
                        checked={findOutCategory(c._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input
                        onChange={handleTagsToggle(t._id)}
                        checked={findOutTag(t._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        if (name === 'photo') {
            setPreviewURL(URL.createObjectURL(event.target.files[0]))
        }
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
    };

    const editSubmission = e => {
        e.preventDefault();
        updateSubmission(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', success: `Submission titled "${data.title}" is successfully updated` });
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const updateSubmissionForm = () => {
        return (
            <form onSubmit={editSubmission}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write something amazing..."
                        onChange={handleBody}
                    />
                </div>

                <div>
                    {fileDownloadLink && <a className="btn btn-warning mr-2" href={fileDownloadLink}>Download Attachments!</a>}
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {fileImageLink && (
                        <img src={fileImageLink} alt={title} style={{ width: '100%' }} />
                    )}
                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>
                    {updateSubmissionForm()}
                    <br />
                    {previewURL && <><h3>Image Preview</h3> <img src={previewURL} width="500"/></>}
                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Attach a File</h5>
                            <hr />

                            <small className="text-muted">Max size: 1mb</small>
                            <br />
                            <label className="btn btn-outline-info">
                                Upload File
                                <input onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr />

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SubmissionUpdate);