import{AssessmentItem,calculatorGrade} from "./models/assessment.model";
const quiz:AssessmentItem{
    id: "QUIZ-001",
    kind: "quiz",
    title:"SQL Basics",
    correctAnswers:8,
    totalQuestions:10,
};
const lab:AssessmentItem={
    id:"QUIZ-001",
    kind:"quiz",
    title:"SQL Basics",
    correctAnswers:8,
    totalQuestions:10,


};
const lab:Assessment={
    id:"LAB-001",
    kind:"lab",
    title:"REST API Project",
    functionalityScore:85,
    codeQualityScore:90,
};
console.log('Quiz grade:${calculateGrade(quiz)}%');
console.log('Lab grade:${calculateGrade(lab)}%');