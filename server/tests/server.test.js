const request=require('supertest');
const expect=require('expect');

const {app}=require('../server');
const {ToDo}=require('../models/todo');

beforeEach((done)=>{

    ToDo.remove({}).then(()=>done());

});

describe('POST /todos',()=>{

    it('should add todo',(done)=>{
 var text='some testing';
        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res)=>{
              expect(res.body.text).toBe(text)

            })
            .end((err,res)=>{

                if(err)
                    return done(err);

                ToDo.find().then((todos)=>{

                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();

                }).catch((e)=>done(e));
            });
    });

    it('should not add todo',(done)=>{

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{

                if(err) {
                    return done(err);
                }
                ToDo.find().then((todos)=>{

                    expect(todos.length).toBe(0);
                    done();

                }).catch((e)=>done(e));
            });
    });

});