

function SlugPage({params}) {

  // Render a hello message with the fetched slug
  const slug = params.slug;

  return (
    <div>
      <h1>Hello, {slug}!</h1>
    </div>
  );
}

export default SlugPage;
