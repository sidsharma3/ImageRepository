import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { singleSubmission, listRelated } from '../../actions/submission';
import { API, DOMAIN, APP_NAME } from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';
import SmallCard from '../../components/submission/SmallCard';
import SubmissionUpdate from '../../components/crud/SubmissionUpdate';
import Admin from '../../components/auth/Admin';

const SingleSubmission = ({ submission, query }) => {

    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ submission }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data)
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {submission.title} | {APP_NAME}
            </title>
            <meta name="description" content={submission.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/submissions/${query.slug}`} />
            <meta property="og:title" content={`${submission.title}| ${APP_NAME}`} />
            <meta property="og:description" content={submission.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/submissions/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/submission/photo/${submission.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/submission/photo/${submission.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    const showSubmissionCategories = submission =>
        submission.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showSubmissionTags = submission =>
        submission.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedSubmission = () => {
        return related.map((submission, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard submission={submission} />
                </article>
            </div>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                    <main>
                        <article>
                            <div className="container-fluid">
                                <section>
                                    <div className="container">
                                        <h1 className="display-5 pb-3 pt-3 text-center font-weight-bold">{submission.title}</h1>
                                        <div class="text-center">
                                            <img
                                                src={`https://res.cloudinary.com/dlgtho53p/image/upload/${submission.fileID}/${submission.fileName}`}
                                                alt={submission.title}
                                                class="rounded mx-auto d-block"
                                                width="750"
                                                className="img"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <a href={`https://res.cloudinary.com/dlgtho53p/image/upload/fl_attachment/${submission.fileID}/${submission.fileName}`} className="mr-2 btn btn-warning pt-2">Download</a>
                                        </div>
                                        <p className="lead mt-3 mark">
                                        Written by{' '}
                                            <Link href={`/profile/${submission.postedBy.username}`}>
                                                <a>{submission.postedBy.name}</a>
                                            </Link>{' '}
                                            | Published {moment(submission.updatedAt).fromNow()}
                                        </p>
                                        <div className="pb-3">
                                            {showSubmissionCategories(submission)}
                                            {showSubmissionTags(submission)}
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="container">
                                <section>
                                    <div className="col-md-12 lead">{renderHTML(submission.body)}</div>
                                </section>
                            </div>

                            <div className="container">
                                <h4 className="text-center pt-5 pb-5 h2">Related submissions</h4>
                                <hr />
                                <div className="row">
                                    {showRelatedSubmission()}
                                </div>
                            </div>
                        </article>
                    </main>
            </Layout>
        </React.Fragment>
    );
};

SingleSubmission.getInitialProps = ({ query }) => {
    return singleSubmission(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { submission: data, query };
        }
    });
};

export default SingleSubmission;