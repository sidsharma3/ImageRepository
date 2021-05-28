import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import SubmissionRead from '../../../components/crud/SubmissionRead';

const Submission = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage submissions</h2>
                        </div>
                        <div className="col-md-12">
                            <SubmissionRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Submission;