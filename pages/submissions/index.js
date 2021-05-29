import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router'
import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { listSubmissionsWithCategoriesAndTags } from '../../actions/submission';
import Card from '../../components/submission/Card';
import {API, DOMAIN, APP_NAME} from '../../config'
import Admin from '../../components/auth/Admin';

const Submissions = ({ submissions, categories, tags, totalSubmissions, submissionsLimit, submissionSkip, router }) => {
    const head = () => (
        <Head>
            <title>{APP_NAME}</title>
            <meta
                name="description"
                content="Programming submissions and tutorials on react node next vue php laravel and web developoment"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Programming submissions and tutorials on react node next vue php laravel and web developoment"
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

        </Head>
    );

    const [limit, setLimit] = useState(submissionsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalSubmissions);
    const [loadedSubmissions, setLoadedSubmissions] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listSubmissionsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedSubmissions([...loadedSubmissions, ...data.submissions]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };

    const showAllSubmissions = () => {
        return submissions.map((submission, i) => {
            // ()
            return (
                <article key={i}>
                    <Card submission={submission} />
                    <hr />
                </article>
            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));
    };

    const showLoadedSubmissions = () => {
        return loadedSubmissions.map((submission, i) => (
            <article key={i}>
                <Card submission={submission} />
            </article>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                    <main>
                        <div className="container-fluid">
                            <header>
                                <div className="col-md-12 pt-3">
                                    <h1 className="display-4 font-weight-bold text-center">
                                        Click on the Categories and Tags Below to Filter Images
                                    </h1>
                                </div>
                                <section>
                                    <div className="pb-5 text-center">
                                        {showAllCategories()}
                                        <br />
                                        {showAllTags()}
                                    </div>
                                </section>
                            </header>
                        </div>
                        <div className="container-fluid">{showAllSubmissions()}</div>
                        <div className="container-fluid">{showLoadedSubmissions()}</div>
                        <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
                    </main>
            </Layout>
        </React.Fragment>
    );
};

Submissions.getInitialProps = () => {
    let skip = 0;
    let limit = 2;
    return listSubmissionsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data);
            return {
                submissions: data.submissions,
                categories: data.categories,
                tags: data.tags,
                totalSubmissions: data.size,
                submissionsLimit: limit,
                submissionSkip: skip
            };
        }
    });
};

export default withRouter(Submissions);