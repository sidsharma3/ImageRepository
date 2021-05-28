import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import SubmissionCreate from '../../../components/crud/SubmissionCreate';

const CreateSubmission = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a New Submission</h2>
                        </div>
                        <div className="col-md-12">
                            <SubmissionCreate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default CreateSubmission;