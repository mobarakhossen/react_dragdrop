import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button, Form, ListGroup} from 'react-bootstrap';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import {addCategoryItem , reInitializeDragandDrop, removeMainCategory, categoryModify} from '../action/menu';


class MenuDragDrop extends React.Component {

    constructor(props) {
        super(props);
        this.refs = React.createRef();
        this.state = {
            treeData: [
                { title: 'Project 01', children: [{ title: 'Sub Project' }] },
                { title: 'Project 02', children: [{ title: 'Sub Project' }] },
                { title: 'Project 03', children: [{ title: 'Sub Project' }] },
                { title: 'Project 04', children: [{ title: 'Sub Project' }] },
                { title: 'Project 05', children: [{ title: 'Sub Project' }] }
            ],
            isEdit:false,
            editIndex: ""
        };
    }

    componentDidMount() {
       // console.log(this.props.category);
    }

    handleAdd = () => {
        let itemvalue = this.refs.catItem.value;
        if(itemvalue.length) {
            var item = { title: itemvalue, children: [] }
            this.props.addCategoryItem(item);
            this.setState({treeData:[...this.state.treeData,item]})
            this.refs.catItem.value = '';
        }
      
    }

    test = () => {
       console.log("test = ",this.state.treeData);
    }

    reInitializeReducer = () => {

        this.props.reInitializeDragandDrop(this.state.treeData);
    }
    handleRemove = (index) => {
        var category = this.state.treeData;
        const newcategory = category.filter((cat,key) => key !=index);
        this.setState({treeData:[...newcategory]})
        this.props.removeMainCategory({catkey:index});
    }
    handleEdit = (index) => {
        var category = this.state.treeData;
        const editItem = category.filter((cat,key) => key == index);
        console.log(" editItem = ",editItem)
        this.refs.catItem.value = editItem[0].title;
        this.setState({isEdit:true,editIndex:index})
    }
    handleModify = () => {
        var category = this.state.treeData;
        var itemkey = this.state.editIndex;
        let itemvalue = this.refs.catItem.value;
        var categoryItem = this.state.treeData.map((item,key) => {
            var changeItem = { title: itemvalue, children: item.children }
            if(key == this.state.editIndex) {
                return {
                    ...item,
                    ...changeItem
                }
            } else {
                return item;
            }
        });
        this.refs.catItem.value = '';
        this.setState({isEdit:false,editIndex:"",treeData:categoryItem});
        this.props.categoryModify({title:itemvalue,key:itemkey})
    }

    handleEditcancle = () => {
        this.refs.catItem.value = '';
        this.setState({isEdit:false,editIndex:""});
    }
    
    render() {
      var category = this.state.treeData;
        return(
            <Fragment>
               
                <Row>
                    <Col>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Control placeholder="Add New Item" ref="catItem" data_key=""/>
                                </Col>
                                <Col>
                                    {this.state.isEdit &&<Fragment>
                                        <Button onClick={this.handleModify} variant="primary"> Edit</Button> <Button onClick={this.handleEditcancle} variant="secondary"> Cancle</Button>
                                        </Fragment>}
                                    {!this.state.isEdit &&<Button onClick={this.handleAdd}> Add</Button>}
                                    
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                    

                        {category.length && <Fragment>
                            <ListGroup>
                                {
                                    category.map((menu,key)=> <Fragment key={key}>
                                        <ListGroup.Item>{menu.title}   <Button variant="primary buttonMargin" onClick={()=>this.handleEdit(key)}>Edit</Button> <Button variant="danger buttonMargin" onClick={()=>this.handleRemove(key)}>Remove</Button> <br></br>
                                            {menu.children && menu.children.map((childrenmenu,ckey)=><Fragment key={ckey}> 
                                                <ListGroup.Item>{childrenmenu.title}
                                                    {childrenmenu.children && childrenmenu.children.map((tchildrenmenu,tckey)=><Fragment key={tckey}>
                                                    <ListGroup.Item>{tchildrenmenu.title}</ListGroup.Item>
                                                </Fragment>)}
                                                </ListGroup.Item>
                                            </Fragment>)}
                                        </ListGroup.Item>
                                    </Fragment>
                                )}
                            
                            </ListGroup>
                        </Fragment>}
                    
                 
                      
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ height: 400 }}>
                            <SortableTree
                                treeData={this.state.treeData}
                                onChange={treeData => this.setState({ treeData })}
                                onDragStateChanged ={ ()=>this.reInitializeReducer()}
                            />
                        </div>
                    </Col>
                </Row>
                
                
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    category: state.menu.category,
});

const mapDispatchToProps = dispatch => ({
    addCategoryItem: (requestData) => dispatch(addCategoryItem(requestData)),
    reInitializeDragandDrop: (requestData) => dispatch(reInitializeDragandDrop(requestData)),
    removeMainCategory: (requestData) => dispatch(removeMainCategory(requestData)),
    categoryModify: (requestData) => dispatch(categoryModify(requestData)),
});
export default connect(mapStateToProps,mapDispatchToProps)(MenuDragDrop);