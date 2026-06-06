import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

function TeamMember() {
    return (
        <>
            <h2>Project Member</h2>
            <p>Dujjonku를 함께 만들어가는 사람들입니다.</p>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '50px', marginTop: '30px', justifyContent: 'center' }}>
                
                {/* 현철 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px', textAlign: 'center' }}>
                    <FiUser size={70} color='#2B6C00' style={{ marginBottom: '15px' }} />
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1B1C1C' }}>최현철</h3>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#1B1C1C' }}>Backend, Frontend</h2>
                    <span style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                        '/report' page<br />
                        Ranking Features< br/>
                        Buzzword process<br />
                        Development WordDetail<br />
                        Set Backend infrastructure
                    </span>
                </div>

                <div style={{ width: '1px', height: '250px', backgroundColor: '#d1d1d1' }}></div>

                {/* 진영 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px', textAlign: 'center' }}>
                    <FiUser size={70} color='#2B6C00' style={{ marginBottom: '15px' }} />
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1B1C1C' }}>김진영</h3>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#1B1C1C' }}>Backend, Frontend</h2>
                    <span style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                        Main Landing Page<br />
                        Dashboard Page< br/>
                        UI/UX Design<br />
                        Data Crawling<br />
                        API Integration
                    </span>
                </div>

                <div style={{ width: '1px', height: '250px', backgroundColor: '#d1d1d1' }}></div>

                {/* 재광 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px', textAlign: 'center' }}>
                    <FiUser size={70} color='#2B6C00' style={{ marginBottom: '15px' }} />
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1B1C1C' }}>박재광</h3>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#1B1C1C' }}>Backend, Frontend</h2>
                    <span style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                        Security<br />
                        Admin Domain< br/>
                        Quiz Domain<br />
                        Subscription Domain<br />
                        DB Architecture
                    </span>
                </div>
            </div>
        </>
    );
}

export default TeamMember;