import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import SubmissionCreate from '../../../components/crud/SubmissionCreate';

const Submission = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a Image Post</h2>
                        </div>
                        <div className="col-md-12">
                            <SubmissionCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Submission;