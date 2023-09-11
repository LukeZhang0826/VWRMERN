import React from "react";
import "./servicePage.scss";

const Services = () => {
    return (
        <section className="services-section">
            <div className="services">
                <p className="service-title">RMT Massage</p>
                <div className="service-container">
                    <img className="service-container-image" src="img/service-swedish.jpg" alt="Swedish Massage" fluid />
                    <div className="service-container-content">
                        <p className="service-container-title">Swedish Massage</p>
                        <p className="service-container-paragraph">A relaxing, circulation-boosting massage using gentle strokes and kneading to reduce tension and promote well-being.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Duration</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>30 minutes</td>
                                    <td>$60</td>
                                </tr>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$80</td>
                                </tr>
                                <tr>
                                    <td>60 minutes</td>
                                    <td>$100</td>
                                </tr>
                                <tr>
                                    <td>90 minutes</td>
                                    <td>$145</td>
                                </tr>
                                <tr>
                                    <td>120 minutes</td>
                                    <td>$190</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="service-container">
                    <div className="service-container-content">
                        <p className="service-container-title">Aromatherapy Massage</p>
                        <p className="service-container-paragraph">Essential oils added to massage for relaxation and holistic well-being.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Duration</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$90</td>
                                </tr>
                                <tr>
                                    <td>60 minutes</td>
                                    <td>$110</td>
                                </tr>
                                <tr>
                                    <td>90 minutes</td>
                                    <td>$155</td>
                                </tr>
                                <tr>
                                    <td>120 minutes</td>
                                    <td>$200</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <img className="service-container-image" src="img/service-aromatherapy-massage.jpg" alt="Aromatherapy Massage" fluid />
                </div>
                <div className="service-container">
                    <img className="service-container-image" src="img/service-hot-stone-massage.jpg" alt="Hot Stone Massage" fluid />
                    <div className="service-container-content">
                        <p className="service-container-title">Hot Stone Massage</p>
                        <p className="service-container-paragraph">Therapeutic massage using heated stones to relax muscles and promote deep relaxation.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Duration</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$90</td>
                                </tr>
                                <tr>
                                    <td>60 minutes</td>
                                    <td>$110</td>
                                </tr>
                                <tr>
                                    <td>90 minutes</td>
                                    <td>$155</td>
                                </tr>
                                <tr>
                                    <td>120 minutes</td>
                                    <td>$120</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="service-container">
                    <div className="service-container-content">
                        <p className="service-container-title">Lymphatic Drainage Massage</p>
                        <p className="service-container-paragraph">Gentle technique to improve lymph flow, supporting immune system and reducing swelling.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Duration</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$80</td>
                                </tr>
                                <tr>
                                    <td>60 minutes</td>
                                    <td>$100</td>
                                </tr>
                                <tr>
                                    <td>90 minutes</td>
                                    <td>$145</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <img className="service-container-image" src="img/service-lymphatic-drainage.jpg" alt="Lymphatic Drainage Massage" fluid />
                </div>
                <div className="service-container">
                    <img className="service-container-image" src="img/service-deep-tissue.jpg" alt="Deep Tissue Massage" fluid />
                    <div className="service-container-content">
                        <p className="service-container-title">Deep Tissue Massage</p>
                        <p className="service-container-paragraph"> Intensive pressure targeting deep muscle layers to alleviate chronic tension and pain.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Duration</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$80</td>
                                </tr>
                                <tr>
                                    <td>60 minutes</td>
                                    <td>$100</td>
                                </tr>
                                <tr>
                                    <td>90 minutes</td>
                                    <td>$145</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="services">
                <p className="service-title">Acupuncture</p>
                <div className="service-container">
                    <div className="service-container-content">
                        <p className="service-container-paragraph">Traditional Chinese practice involving thin needles inserted into specific points on the body to promote health and alleviate pain.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Inital Assessment</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>75 minutes</td>
                                    <td>$130</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Follow Up</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$80</td>
                                </tr>
                                <tr>
                                    <td>60 minutes</td>
                                    <td>$100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <img className="service-container-image" src="img/service-acupuncture.jpg" alt="Acupuncture" fluid />
                </div>
            </div>
            <div className="services">
                <p className="service-title">Chiropractic</p>
                <div className="service-container">
                    <img className="service-container-image" src="img/service-chiropractic.jpg" alt="Chiropratic" fluid />
                    <div className="service-container-content">
                        <p className="service-container-paragraph">Healthcare approach focused on diagnosing and treating musculoskeletal disorders, often through manual adjustments of the spine.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Inital Assessment</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$110</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Follow Up</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>30 minutes</td>
                                    <td>$85</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="services">
                <p className="service-title">Physiotherapy</p>
                <div className="service-container">
                    <img className="service-container-image" src="img/service-physiotherapy.jpg" alt="Physiotherapy" fluid />
                    <div className="service-container-content">
                        <p className="service-container-paragraph">Medical practice employing exercises, manual techniques, and modalities to restore movement, alleviate pain, and aid physical rehabilitation.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Inital Assessment</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$110</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Follow Up</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>30 minutes</td>
                                    <td>$85</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="services">
                <p className="service-title">Facial</p>
                <div className="service-container">
                    <img className="service-container-image" src="img/service-facial.jpg" alt="Facial" fluid />
                    <div className="service-container-content">
                        <p className="service-container-paragraph">Medical practice employing exercises, manual techniques, and modalities to restore movement, alleviate pain, and aid physical rehabilitation.</p>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Hydrating</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>45 minutes</td>
                                    <td>$65</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="service-container-table">
                            <thead>
                                <tr>
                                    <th>Cleaning</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>60 minutes</td>
                                    <td>$80</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services;
