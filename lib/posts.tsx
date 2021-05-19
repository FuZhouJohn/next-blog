import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const markdownDir = path.join(process.cwd(), 'markdown');

export const getPosts = async () => {
    const fileNames = await fs.readdir(markdownDir);
    const posts = [];
    for (let i = 0; i < fileNames.length; i++) {
        const fullPath = path.join(markdownDir, fileNames[i]);
        const id = fileNames[i].replace(/.md/g, '');
        const text = await fs.readFile(fullPath, 'utf-8');
        const {data: {title, date}} = matter(text);
        posts.push({
            id,
            title,
            date,
        });
    }
    return posts;
};

export const getPost = async (id: string) => {
    const fullPath = path.join(markdownDir, id + '.md');
    const text = await fs.readFile(fullPath, 'utf-8');
    const {data: {title, date}, content} = matter(text);
    return JSON.parse(JSON.stringify({
        id, title, date, content
    }));
};

export const getPostIds = async()=>{
    const fileNames = await fs.readdir(markdownDir);
    return fileNames.map(fileName=>fileName.replace(/\.md$/g,''))
}
