import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getStorage, getFile } from '../http';
import { log } from 'console';

type RouteParams = {
  bookPath: string;
};

export const NoteContent = () => {
  const [searchParams] = useSearchParams();
  const bookPath = searchParams.get('bookDir');

  const navigate = useNavigate();
  const [content, setContent] = useState<string[] | null>(null);
  console.log(bookPath);
  useEffect(() => {
    (async () => {
      console.log(bookPath);
      console.log(`%7B%22limit%22:24,%22sortBy%22:%22CreationTime%22,%22sortOrder%22:%22Desc%22,%22offset%22:0,%22dir%22:%22${bookPath}%22,%22refresh%22:false%7D`);

      const response = await getStorage(`%7B%22limit%22:24,%22sortBy%22:%22CreationTime%22,%22sortOrder%22:%22Desc%22,%22offset%22:0,%22dir%22:%22${bookPath}%22,%22refresh%22:false%7D`);

      if (response.code === 0 && response.data.list.length > 0) {
        const fileRes = await getFile(response.data.list[0].path);

        if (fileRes) {

          const noteList = parseNoteData(fileRes)
          setContent(noteList)

        }
      }
    })();
  }, [bookPath]);


  function parseNoteData(noteData: string): Array<string> {
    const notesArray: Array<string> = noteData.split('-------------------')
      .filter(note => note.trim() !== '')
      .map(note => {
        return note
      });
    return notesArray;
  }


  const handleBack = () => {
    navigate('/');
  };

  // 为每一个button添加事件
  const selectAllText = (id: string) => {
    let container = document.getElementById(id);
    if (window.getSelection) {
      let range = document.createRange();
      range.selectNode(container!);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    } else {
      console.log("Your browser does not support this feature");
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <button style={{ position: 'fixed', top: '0' }} onClick={handleBack}>返回</button>
      {content !== null ? content.map((note, index) => {
        let textWithBreaks = note.replace(/\n/g, '<br />').replace(/^<br \/>/, '');

        // 创建id
        let id = generateId();

        return (
          <div key={index} style={{ margin: '1rem', color: '#333' }}>
            <div onMouseEnter={() => selectAllText(id)} draggable="false" id={id} style={{
              color: '#333',
              fontStyle: 'italic',
              borderLeft: '4px solid #ccc',
              paddingLeft: '10px',
              margin: '1rem',
            }} dangerouslySetInnerHTML={{ __html: textWithBreaks }} />
            {/* <button onClick={() => selectAllText(id)}>选中全部文本</button> */}
          </div>
        );
      }) : <div>loading...</div>}
    </div>
  );
}

// 动态创建一个id序列以区别每个note
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);