import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import SubmissionUpdateAdmin from '../../../components/crud/SubmissionUpdateAdmin';
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../components/image-editor"),
  { ssr: false }
);

const Submission = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update Submission</h2>
                        </div>
                        <div className="col-md-12">
                            <SubmissionUpdateAdmin />
                            <DynamicComponentWithNoSSR />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Submission;