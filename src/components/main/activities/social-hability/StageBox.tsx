// export const StageBox = () => {
//     return (
//         <div className="card-body">
//             <h5 className="card-title">Escenario {scenario.id}</h5>
//             <p className="card-text">{scenario.description}</p>
//                 <div className="list-group mt-3">
//                 {scenario.options.map((option, index) => (
//                     <button
//                     key={index}
//                     className={`list-group-item list-group-item-action ${selectedOption === index ? 'active' : ''}`}
//                     onClick={() => handleOptionSelect(index)}
//                     disabled={showFeedback}
//                     >
//                     {option}
//                     </button>
//                 ))}
//                 </div>
//             {showFeedback && (
//             <div className="alert alert-info mt-3" role="alert">
//                 {scenario.feedback[selectedOption!]}
//             </div>
//             )}
//             {showFeedback && (
//             <button className="btn btn-primary mt-3" onClick={nextScenario}>
//                 Siguiente Escenario
//             </button>
//             )}
//         </div>
//     )
// }