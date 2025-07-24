import React, { useEffect, useState } from 'react';
import styles from './Members.module.css';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://api.github.com/orgs/Round-Studio/members');
        
        if (!response.ok) {
          throw new Error(`GitHub API 请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error('获取成员数据时出错:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className={styles.container}>

        {loading && (
          <div className={styles.loading}>正在加载成员数据...</div>
        )}

        {error && (
          <div className={styles.error}>
            加载成员数据失败: {error}
          </div>
        )}

        {members.length > 0 && (
          <div className={styles.memberGrid}>
            {members.map(member => (
              <div key={member.id} className={styles.memberCard}>
                <img 
                  src={member.avatar_url} 
                  alt={member.login}
                  className={styles.avatar}
                  width={120}
                  height={120}
                />
                <h3 className={styles.memberName}>
                  <a 
                    href={member.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {member.login}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}