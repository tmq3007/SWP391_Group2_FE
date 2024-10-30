import React from 'react';
import { Link } from 'react-router-dom';

export const Homepage = () => {
    return (
        <div style={{ display: 'flex', marginTop:'10px', marginLeft: '20px' }}>
            <div style={{ width: '75%' }}>
                <h4 style={{fontWeight:"bold"}}>Discovery</h4>
                <ul>
                    <li>
                        <Link to="/help-center/order-payment" style={{color: '#019376', textDecoration: 'none'}}>
                            Where can I see order?
                        </Link>
                    </li>
                    <li>
                        <Link to="/help-center/new-user" style={{color: '#019376', textDecoration: 'none'}}>
                            How to get favourite product?
                        </Link>
                    </li>
                    <li>
                        <Link to="/help-center/explore" style={{color: '#019376', textDecoration: 'none'}}>
                            How can I pay?
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
