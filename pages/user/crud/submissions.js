import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import SubmissionRead from '../../../components/crud/SubmissionRead';
import { isAuth } from '../../../actions/auth';

const Submission = () => {
    const username = isAuth() && isAuth().username;
    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage Submissions</h2>
                        </div>
                        <div className="col-md-12">
                            <SubmissionRead username={username} />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Submission;