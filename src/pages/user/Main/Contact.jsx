import React, { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

function Contact() {
    return (
        <>
            <h3 style={{ margin: 0, marginBottom: '10px' }}>Dujjonku Contact</h3>
            <div style={{ color: '#aaa', fontSize: '0.9rem', margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiMail size={18} /> 이메일: dujjonku@naver.com 
                    </span>
                    <span>| </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiPhone size={18} /> 전화번호: 010-1234-4321
                    </span>
                </div>
                <span style={{ marginTop: '10px' }}>© 2026 Dujjonku Team.</span>
            </div>
        </>
    );
}

export default Contact;