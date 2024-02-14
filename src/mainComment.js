import React from 'react'
import { useState } from 'react'

const SubComment = ({name,comment,onDelete}) =>{
    const [subComments, setSubComments] = useState([]);
    const [newSubCommentName, setNewSubCommentName]=useState('');
    const [newSubCommentText,setNewSubCommentText]=useState('');
    const [reply, setReply] = useState(false)

    const handleAddSubComment = () =>{
        setSubComments(prevSubComments => 
            [...prevSubComments,
                 {id:Math.random().toString(36),
                  name:newSubCommentName,
                  text:newSubCommentText}]);
        setNewSubCommentName('');
        setNewSubCommentText('');
        setReply(false)
    }

    const handleDelete = (id) =>{
        const updatedCommentList = subComments.filter(comment => comment.id !== id);
        setSubComments(updatedCommentList)
    }

    return(
        <div style={{marginLeft: '20px',
            marginTop: '10px',
            marginRight: '20px',
            border: '1px solid black',
            padding: '5px',
            boxShadow: '1px 4px 7px 2px gray'}}>
            <div className='mainComment'>
                <h3>{comment.name}</h3>
                <p>{comment.text}</p>
                <button className='delete' onClick={()=>onDelete(comment.id)}>Delete</button>
            </div>
            <div style={{marginLeft:'20px', marginTop:'10px'}}>
                {
                    subComments.map(subComment => (
                        <div key={subComment.id} className='subComment'>
                            <h4>{subComment.name}</h4>
                            <p>{subComment.text}</p>
                            <button className='delete' onClick={()=>handleDelete(subComment.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
            <div>
                { reply ? (
                    <div>
                        <input type='text' value={newSubCommentName} onChange={(e)=> setNewSubCommentName(e.target.value)} placeholder='your name' />
                        <textarea cols={10} rows={2} value={newSubCommentText} onChange={(e)=>setNewSubCommentText(e.target.value)} placeholder='seu-Comment' />
                        <button className='addComment' onClick={handleAddSubComment}>Add comment</button>
                        <button onClick={()=>setReply(false)}>Cancel</button>
                    </div>
                ):(
                    <button className='reply' onClick={()=>setReply(!reply)}>Reply</button>
                )

                }

            </div>
        </div>
    )
}

const MainComment=() =>{
    const [comments,setComments]=useState([]);
    const [commentName, setCommentName]=useState('')
    const [commentText, setCommentText]=useState('');

    const handleComment = () =>{
        setComments(prevComments =>
            [...prevComments,
            {
                id:Math.random().toString(36),
                name:commentName,
                text:commentText
            }
        ]);
            setCommentName('');
            setCommentText('');
    }

    const handleDelete = (id) =>{
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    }
    
    return (
            <div>
                <center><h2>Comment Box</h2></center>
                <input 
                type='text'
                placeholder='your name'
                value={commentName}
                onChange={(e)=> setCommentName(e.target.value)} /><br />
                <textarea cols={10} rows={2} value={commentText} onChange={(e)=>setCommentText(e.target.value)} placeholder='Yourcomment' /><br />
                <button className='addComment' onClick={handleComment}>Add Comment</button>
            
            {
                comments.map(comment => (
                    <SubComment key={comment.id} name={comment.name} comment={comment} onDelete={handleDelete} />
                ))
            }
        </div>
  )
}

export default MainComment