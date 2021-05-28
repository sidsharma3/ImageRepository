import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeSubmission } from '../../actions/submission';
import moment from 'moment';

const SubmissionRead = ({ username }) => {
    const [submissions, setSubmissions] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadSubmissions();
    }, []);

    const loadSubmissions = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setSubmissions(data);
            }
        });
    };

    const deleteSubmission = slug => {
        removeSubmission(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadSubmissions();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this?');
        if (answer) {
            deleteSubmission(slug);
        }
    };

    const showUpdateButton = submission => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <a href={`/user/crud/${submission.slug}`} className="ml-2 btn btn-sm btn-warning">Update</a>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <a href={`/admin/crud/${submission.slug}`} className="ml-2 btn btn-sm btn-warning">Update</a>
            );
        }
    };

    const showAllSubmissions = () => {
        return submissions.map((submission, i) => {
            return (
                <div key={i} className="pb-5">
                    <h3>{submission.title}</h3>
                    <p className="mark">
                        Written by {submission.postedBy.name} | Published on {moment(submission.updatedAt).fromNow()}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(submission.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(submission)}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllSubmissions()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default SubmissionRead;