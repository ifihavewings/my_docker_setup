import{d,D as u,B as m,C as y,o as h,j as k,m as e,v as l,k as t,w as o,l as s,F as _,E as v}from"./index-u68fL4fj.js";import{u as S}from"./useHighlight-z6n5pGVf.js";const f=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
            import { reactive } from 'vue'

            const data = reactive({
                name: '张三',
                age: 30,
                salary: 10000,
                skills: ['JavaScript', 'HTML', 'CSS']
            })

            const changeAge = () => {
                data.age++
            }
            const changeSalary = () => {
                data.salary += 1000
            }
            const changeSkills = () => {
                data.skills.push('Vue.js')
            }
            const changeAllProperty = () => {
                Object.assign(data, { age: 29, salary: 50000, skills: ['ppp', 'aaa', 'sss', 'Vueddd'] })
                console.log('data')
                console.log(data)
            }
        `),s(`
    `)],-1),x=d({__name:"ReactiveApi",setup(C){S();const c=u();m(()=>c.matched,()=>{console.log("===================================="),console.log(c.matched),console.log("====================================")},{immediate:!0});const a=y({name:"张三",age:30,salary:1e4,skills:["JavaScript","HTML","CSS"]}),r=()=>{a.age++},i=()=>{a.salary+=1e3},g=()=>{a.skills.push("Vue.js")},p=()=>{Object.assign(a,{age:29,salary:5e4,skills:["ppp","aaa","sss","Vueddd"]}),console.log("data"),console.log(a)};return(V,j)=>{const n=v;return h(),k(_,null,[e("h1",null,"name: "+l(a.name),1),e("div",null,"age: "+l(a.age),1),e("div",null,"salary: "+l(a.salary),1),e("div",null,"skills: "+l(a.skills),1),t(n,{onClick:r,type:"primary"},{default:o(()=>[s("age++")]),_:1}),t(n,{onClick:i,type:"primary"},{default:o(()=>[s("salary++")]),_:1}),t(n,{onClick:g,type:"primary"},{default:o(()=>[s("skills-change")]),_:1}),t(n,{onClick:p,type:"primary"},{default:o(()=>[s("skills-change")]),_:1}),f],64)}}});export{x as default};
