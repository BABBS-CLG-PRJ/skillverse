import React from 'react'

const Quiz = ({ params }) => {
    const {CourseId, QuizId} = params;
    return (
        <div>
            <div>{CourseId}</div>
            <div>{QuizId}</div>
        </div>
    )
}

export default Quiz