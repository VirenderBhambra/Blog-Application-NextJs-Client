import axios from 'axios';
import styles from './page.module.css';
async function getData(slug) {
  try {
    const response = await axios.get(`https://blog-application-express-server.onrender.com/blog/s/${slug}`,{ next: { revalidate: 3600 } });
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return error;
  }
} 
 
export default async function Page({params}) {
  
  const slug = params.slug
  const data = await getData(slug);
  const date = new Date(data.date);
  const formattedDate = date.toLocaleString();
  return <main className={styles.container}>
    <div dangerouslySetInnerHTML={{ __html: data.title }} />
    <div className={styles.section}>
    <span style={{fontWeight:'bold',fontSize:20}}>Author : {data.author}</span>
    <span style={{fontWeight:'bold',fontSize:20}}>Created at : {formattedDate}</span>
    </div>
    <div dangerouslySetInnerHTML={{ __html: data.content }} className={styles.content}/>
    <div dangerouslySetInnerHTML={{ __html: data.hashtags }} />
  </main>;
}
