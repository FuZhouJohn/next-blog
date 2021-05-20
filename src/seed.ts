import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';

createConnection().then(async connection => {
    const posts = await connection.manager.find(Post);

    if (posts.length > 0) return;

    const data = [];
    for (let i = 1; i <= 10; i++) {
        data.push(new Post({title: `Post ${i}`, content: `第 ${i} 篇文章`}));
    }
    await connection.manager.save(data);
}).catch(error => console.log(error));
