import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12 pt-5 pb-5 text-center">
                            <h2>User Dashboard</h2>
                        </div>
                        <div className="col-md-4 text-center">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <a href="/user/crud/submission">Upload Image</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/crud/submissions">
                                        <a>Update/Delete Images</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <a href="/user/update">Update profile</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserIndex;