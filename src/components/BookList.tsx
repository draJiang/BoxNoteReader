// # BookList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../http';

// 初始参数
const INITIAL_ARGS = '%7B%22limit%22:24,%22sortBy%22:%22CreationTime%22,%22sortOrder%22:%22Desc%22,%22offset%22:0,%22dir%22:%22%2Fstorage%2Femulated%2F0%2Fnote%22,%22refresh%22:false%7D';

export const BookList = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState<any[] | null>(null);

    useEffect(() => {
        (async () => {
            const response = await getStorage(INITIAL_ARGS);

            if (response.code === 0) {
                setBookList(response.data.list);
            }
        })();
    }, []);

    const handleClick = (path: string) => {
        console.log(path);

        // navigate('' + path);
        navigate(`/note/?bookDir=${encodeURIComponent(path)}`);
    }

    if (bookList?.length === 0){
        return <div>暂无笔记</div>
    }

        return (
            <div style={{}}>

                {bookList !== null ? bookList.map((book: any) =>
                    <div
                        key={book.name}
                        onClick={() => handleClick(book.path)}
                        style={{
                            cursor: 'pointer',
                            marginBottom: '1rem',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            color: '#333',
                            // backgroundColor: '#fff',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        {book.name}
                    </div>
                ) : 'loading...'}
            </div>

        );
};


// type RouteParams = {
//     bookPath: string;
// };

// // # BookContent.tsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getStorage, getFile } from '../http';

// export const BookContent = () => {
//     const { bookPath } = useParams<RouteParams>();
//     const navigate = useNavigate();

//     const [content, setContent] = useState('');

//     useEffect(() => {
//         (async () => {
//             const response = await getStorage(`%7B%22limit%22:24,%22sortBy%22:%22CreationTime%22,%22sortOrder%22:%22Desc%22,%22offset%22:0,%22dir%22:%22${bookPath}%22,%22refresh%22:false%7D`);

//             if (response.code === 0 && response.data.list.length > 0) {
//                 const fileRes = await getFile(response.data.list[0].path);

//                 if (fileRes.code === 0) {
//                     setContent(fileRes.data);
//                 }
//             }
//         })();
//     }, [bookPath]);

//     const handleBack = () => {
//         navigate('/');
//     }

//     return (
//         <div>
//             <button onClick={handleBack}>返回</button>
//             <div>{content}</div>
//         </div>
//     );
// };
