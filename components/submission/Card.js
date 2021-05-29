import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import { list, removeSubmission } from '../../actions/submission';
import { getCookie, isAuth } from '../../actions/auth';

const Card = ({ submission }) => {
    const token = getCookie('token');
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

    return (
        <div className="lead pb-4">
            <header>
                <Link href={`/submissions/${submission.slug}`}>
                    <a>
                        <h2 className="pt-3 pb-3 font-weight-bold">{submission.title}</h2>
                    </a>
                </Link>
            </header>
            <section>
                <p className="mark ml-1 pt-2 pb-2">
                Written by{' '}
                    <Link href={`/profile/${submission.postedBy.username}`}>
                        <a>{submission.postedBy.name}</a>
                    </Link>{' '}
                    | Published {moment(submission.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showSubmissionCategories(submission)}
                {showSubmissionTags(submission)}
                <br />
                <br />
            </section>

            <div className="row">
                <div className="col-md-4">
                    <section>
                        <img
                            className="img img-fluid"
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`https://res.cloudinary.com/dlgtho53p/image/upload/${submission.fileID}/${submission.fileName}`}
                            alt={submission.title}
                        />
                    </section>
                </div>
                <div className="col-md-8">
                    <section>
                        <div className="pb-3">{submission && submission.excerpt ? renderHTML(submission.excerpt) : 'No Excerpt'}</div>
                        <a href={`/submissions/${submission.slug}`} className="mr-2 btn btn-primary pt-2">Read more</a>
                        <a href={`https://res.cloudinary.com/dlgtho53p/image/upload/fl_attachment/${submission.fileID}/${submission.fileName}`} className="mr-2 btn btn-warning pt-2">Download</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Card;