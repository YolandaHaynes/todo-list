function AboutPage() {
  return (
    <div className="page-container">
      <section className="page-card">
        <h1>About This App</h1>

        <p>
          This Todo application is designed to help users organize and manage
          their daily tasks in a simple and intuitive way.
        </p>

        <section className="about-section">
          <h2>Features</h2>
          <p>
            Users can create new todos, edit existing tasks, mark todos as
            complete, and delete tasks they no longer need. Todos can also be
            searched, sorted, and filtered by their completion status.
          </p>
        </section>

        <section className="about-section">
          <h2>Technologies Used</h2>
          <p>
            This application was built using React, React Router, JavaScript,
            CSS, and Vite. It uses a REST API to manage todo data and includes
            user authentication and protected routes.
          </p>
        </section>
        
      </section>
    </div>
  );
}

export default AboutPage;
