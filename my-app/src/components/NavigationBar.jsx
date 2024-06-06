import { Container, Navbar,Row} from 'react-bootstrap';
import { Film, Person  } from 'react-bootstrap-icons';

function NavigationBar(props) {

  return (
    <header className="py-1 py-md-3 border-bottom bg-primary">
    <Container fluid className="gap-3 align-items-center">
    <Row>
        <div className="col-6 col-md-4">
        <a href="/" className="d-flex align-items-center justify-content-center justify-content-md-start h-100 link-light text-decoration-none">
            Film Libary
            <Film/>
        </a>
        </div>
        <div className="col-3 col-md-8 d-flex align-items-center justify-content-end">
            <label>
                <input className="form-control me-2" name="myInput" placeholder="search" />
            </label>
            <Person className="ml-pull-right"/>
        </div>
      </Row>
      </Container>
    </header>
  )
}

export default NavigationBar