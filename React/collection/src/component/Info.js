import React from 'react';

const Info = () => {
    return (
        <div className="container text-center mt-5">
            {/* Main Heading */}
            <h1 className="display-4 text-primary mb-4 animate__animated animate__fadeIn">Welcome to Our Collection Hub!</h1>
            
            {/* Lead Text */}
            <p className="lead animate__animated animate__fadeIn animate__delay-1s">
                Organize, track, and explore your favorite collections effortlessly with our platform.
            </p>

            <div className="row mt-5">
                {/* Feature 1 */}
                <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-2s">
                    <h2 className="text-danger">Easy Management</h2>
                    <p>Manage your collections easily with intuitive tools designed for efficiency.</p>
                </div>

                {/* Feature 2 */}
                <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-3s">
                    <h2 className="text-success">Fast Access</h2>
                    <p>Access your collections anytime, anywhere, with seamless performance.</p>
                </div>

                {/* Feature 3 */}
                <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-4s">
                    <h2 className="text-info">Comprehensive Features</h2>
                    <p>Enjoy a wide range of features that enhance your collection experience.</p>
                </div>
            </div>
        </div>
    );
}

export default Info;
