import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Notes = (props) => (
  <div>
    <h2>Notes</h2>
    <Table striped hover>
      <tbody>
        {props.notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>
                {note.content}
              </Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

export default Notes