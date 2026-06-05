import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

function TeamMember() {
    return (
        <>
            <h2>Project Member</h2>
            <p>Dujjonku를 함께 만들어가는 사람들입니다.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: '20px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
                    <FiUser size={50} color='#2B6C00' style={{ marginBottom: '15px' }} />
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1B1C1C' }}>최현철</h3>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>backend</span>
                </div>

                <div style={{ width: '1px', height: '80px', backgroundColor: '#d1d1d1' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
                    <FiUser size={50} color='#2B6C00' style={{ marginBottom: '15px' }} />
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1B1C1C' }}>김진영</h3>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>backend</span>
                </div>

                <div style={{ width: '1px', height: '80px', backgroundColor: '#d1d1d1' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
                    <FiUser size={50} color='#2B6C00' style={{ marginBottom: '15px' }} />
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1B1C1C' }}>박재광</h3>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>backend</span>
                </div>
            </div>
        </>
    );
}

export default TeamMember;