import Footer from '../Footer';

const TEAM = [
  {
    name: 'Eric van Zyl, CFA',
    role: 'Co-founder & Managing Director',
    image: '/assets/team/eric_van_zyl.jpg',
    alt: 'Eric van Zyl',
    bio: 'Eric is a financial analyst with a decade in stockbroking. He co-founded Fulcrum alongside Future Media to move from analysing companies to building them, starting in Namibia with the continent in view. He believes the businesses worth building are those with a strong offering, a real customer need, and a clear route to market.',
  },
  {
    name: 'Gary Stroebel',
    role: 'Chairman',
    image: '/assets/team/gary_stroebel.jpg',
    alt: 'Gary Stroebel',
    bio: "Gary has 25 years' experience in the media industry, with a proven track record in sales management, radio programming, and research. He brings M&A experience to the team, and his media background directly contributes to Fulcrum's ability to help portfolio companies build an audience and gain traction with customers.",
  },
  {
    name: 'Stefan Hugo, CA (NAM, SA)',
    role: 'Director',
    image: '/assets/team/stefan_hugo.jpg',
    alt: 'Stefan Hugo',
    bio: "A former Partner at PwC Namibia, Stefan led One Africa TV and 99FM from 2017 through to their merger with Future Media in 2024, giving him first-hand experience of both the commercial and operational realities of Namibia's media landscape. He brings financial rigour and deep sector knowledge to the Fulcrum team.",
  },
];

export default function TeamPage({ isActive }) {
  return (
    <div id="page-team" className={`page${isActive ? ' active' : ''}`}>
      <div className="page-hero">
        <span className="eyebrow">Team</span>
        <h1>The people behind the studio.</h1>
      </div>
      <div style={{ padding: '80px 0 0' }}>
        <div className="team-grid">
          {TEAM.map((member) => (
            <div className="team-member" key={member.name}>
              <div className="team-avatar">
                <img src={member.image} alt={member.alt} />
              </div>
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
