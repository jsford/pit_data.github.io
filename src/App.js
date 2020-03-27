import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import CardDeck from "react-bootstrap/CardDeck";
import { CopyBlock, CodeBlock, monoBlue } from 'react-code-blocks';

class DownloadCard extends React.Component {
  render() {
    return <Card>
      <Card.Img variant="top" src={this.props.imgSrc} />
      <Card.Body className="text-center">
        <br/>
        <h4>{this.props.title}</h4>
        <br/>
        <Container className="text-center">
          <Card.Text style={{fontSize: '15px', lineHeight: '20px'}}>
            {this.props.text}
          </Card.Text>
        </Container>

      </Card.Body>
      <Card.Footer className="text-center download-card-footer">
        <Button variant="primary">Download</Button>
        <br />
        <small className="text-muted">approx. {this.props.approxSize}</small>
      </Card.Footer>
    </Card>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const codeSectionTheme = monoBlue;

    const renderStringText = function(x) {
      return x.split("\n").map((y,i) => (
          <p key={i}>
            {y}
          </p>
      ));
    };

    const authors = [
      {
        name: "Jordan Ford",
        email: ["jsford", "andrew.cmu.edu"],
      },
      {
        name: "Khaled Sharif",
        email: ["khaled.sharif", "nasa.gov"],
      },
      {
        name: "Uland Wong",
        email: ["uland.wong", "nasa.gov"],
      },
      {
        name: "Red Whittaker",
        email: ["red","cmu.edu"],
      },
      {
        name: "Warren Whittaker",
        email: ["warrenw","andrew.cmu.edu"],
      },
      {
        name: "Heather Jones",
        email: ["hjones","andrew.cmu.edu"],
      }
    ];

    const bibtex = `
    @article{
      FORD2019,
      author = {Jordan Ford and Patrick Callaghan and Uland Wong 
      and Heather Jones and Warren Whittaker and Red Whittaker},
      title = {Image and Lidar Dataset of the West Desert Sinkhole: 
      An Analog for Steep-Walled Planetary Pits},
      conference = {Planetary Pits and Caves Conference},
      year = {2019},
    }
    `;

    const codingSection1 = `
    
      x = numpy.linspace(0.0, 1.0, 10000)
      y = x + 5.0 + numpy.random.uniform(-0.1, 0.1, *x.shape)
      df = pandas.DataFrame(data={"x": x, "y": y})
    
    `;

    const cardDeckContent = (
      <React.Fragment>
        <DownloadCard
          imgSrc="paper.jpg"
          title="Paper"
          text="This paper describes the collection apparatus and procedures used
              to create the dataset, the organization of the dataset, and
              anticipated applications for the dataset."
          approxSize="2 MB"
        />


        <DownloadCard
            imgSrc="lidar.png" title="LiDAR"
            text="Combined laser scans provide a dense, precise, textured model of
              the pit that is useful as ground truth for benchmarking
              image-derived models and algorithms, for developing and evaluating
              robot planning, and as a standalone data source for studying
              planetary pits."
            approxSize="10 GB"
        />

        <DownloadCard imgSrc="images.jpg"
                      title="Images"
                      text="Custom camera gantry captured sets of 1500 images from 27
              locations encircling the West Desert Sinkhole at heights and
              angles relevant for small rover exploration, mapping, and
              modeling."
                      approxSize="80 GB"
                      />
      </React.Fragment>
    );

    let mainCardStyle = { marginTop: "25px", marginBottom: "25px",
      boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)",
      border: 'none',
      paddingLeft: '50px',
      paddingRight: '50px',
      backgroundColor: "rgb(255,254,254)",
    };
    if (this.state.width < this.state.height) {
      mainCardStyle = { margin: "0px", border: "none", borderRadius: '0px', padding: "0px" };
    }

    return (
      <Container>
        <Row>
          <Col>
            <Card style={mainCardStyle}>
              <Card.Body>
                <Container className="text-center title-font" style={{padding: '40px'}}>
                  {(() => {
                    if (this.state.width > this.state.height) {
                      return (
                        <h1>Lunar Pit Photogrammetry: A Terrestrial Dataset</h1>
                      );
                    } else if (this.state.width > 768) {
                      return (
                        <h3>Lunar Pit Photogrammetry: A Terrestrial Dataset</h3>
                      );
                    } else {
                      return (
                        <React.Fragment>
                          <h3>Lunar Pit Photogrammetry</h3>
                          <h5>A Terrestrial Dataset</h5>
                        </React.Fragment>
                      );
                    }
                  })()}
                </Container>

                <hr />

                <ListGroup
                  horizontal={this.state.width > this.state.height}
                  className="text-center"
                >
                  {(() => {
                    let parseAuthor = function(x, i) {
                      return <ListGroup.Item className="author-name" key={i}>
                        <h5>{x.name}</h5>
                        <p className="text-muted">{x.email.join("@")}</p>
                      </ListGroup.Item>;
                    };

                    const authorsArrayMidpoint = Math.floor(authors.length / 2);

                    if (this.state.width <= 1024 && this.state.width > 425) {

                      return <Container>
                        <Row>
                          <Col>
                            {
                              authors.slice(0, authorsArrayMidpoint+1).map(parseAuthor)
                            }
                          </Col>
                          <Col>
                            {
                              authors.slice(authorsArrayMidpoint+1).map(parseAuthor)
                            }
                          </Col>
                        </Row>
                      </Container>;

                    } else {
                      return authors.map(parseAuthor);
                    }


                  })()}
                </ListGroup>

                <hr style={{ marginBottom: "50px" }} />

                <h3 style={{ marginBottom: "0px" }}>Abstract</h3>
                <hr style={{ marginTop: "5px" }} />

                <div className="text-justify">
                  <p style={{ marginBottom: "75px" }}>
                    This work presents a LIDAR and image dataset for studying
                    steep-walled planetary pits. A custom camera gantry captured
                    sets of 1500 images from 27 locations encircling the West
                    Desert Sinkhole at heights and angles relevant for small
                    rover exploration, mapping, and modeling. The combined laser
                    scans provide a dense, precise, textured model of the pit
                    that is useful as ground truth for benchmarking
                    image-derived models and algorithms, for developing and
                    evaluating robot planning, and as a standalone data source
                    for studying planetary pits. All images and laser scans are
                    localized within a single coordinate frame using a survey
                    instrument and are publicly available online. This paper
                    describes the collection apparatus and procedures used to
                    create the dataset, the organization of the dataset, and
                    anticipated applications for the dataset.
                  </p>
                </div>

                <h3 style={{ marginBottom: "0px" }}>Downloads</h3>
                <hr style={{ marginTop: "5px" }} />

                {(() => {
                  if (this.state.width <= 425) {
                    return (
                      <div className="card-deck-mobile">{cardDeckContent}</div>
                  );

                  } else if (this.state.width <= 768) {
                    return (
                        <CardDeck className="card-deck-tablet">{cardDeckContent}</CardDeck>
                    );

                  } else
                    {
                      return <CardDeck>{cardDeckContent}</CardDeck>;
                  }
                })()}

                <h3 style={{ marginTop: "75px", marginBottom: "0px" }}>
                  Evaluation
                </h3>
                <hr style={{ marginTop: "5px" }} />


                <p style={{ marginBottom: "25px"}}>
                The combined laser
                scans provide a dense, precise, textured model of the pit
                that is useful as ground truth for benchmarking
                image-derived models and algorithms, for developing and
                evaluating robot planning, and as a standalone data source
                for studying planetary pits.
                </p>


                <Container style={{fontFamily: 'monospace', padding: 0}}>
                <CodeBlock

                  text={codingSection1}
                  language="python"
                  showLineNumbers={false}
                  theme={codeSectionTheme}
                  wrapLines
                />
                </Container>


                <p style={{ marginTop: "25px", marginBottom: "25px"}}>
                The combined laser
                scans provide a dense, precise, textured model of the pit
                that is useful as ground truth for benchmarking
                image-derived models and algorithms, for developing and
                evaluating robot planning, and as a standalone data source
                for studying planetary pits.
                </p>

                <Container style={{fontFamily: 'monospace', padding: 0}}>
                  <CodeBlock

                      text={codingSection1}
                      language="python"
                      showLineNumbers={false}
                      theme={codeSectionTheme}
                      wrapLines
                  />
                </Container>

                <h3 style={{ marginTop: "75px", marginBottom: "0px" }}>
                  Bibtex
                </h3>
                <hr style={{ marginTop: "5px" }} />


                <Container style={{fontFamily: 'monospace', padding: 0}}>
                  <CodeBlock

                      text={bibtex}
                      language="python"
                      showLineNumbers={false}
                      theme={codeSectionTheme}
                      wrapLines
                  />
                </Container>

                <br/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
