import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import SubmissionUpdate from '../../../components/crud/SubmissionUpdate';

const Submission = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update Image Post</h2>
                        </div>
                        <div className="col-md-12">
                            <SubmissionUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Submission;