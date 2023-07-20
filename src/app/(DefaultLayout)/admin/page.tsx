'use client'
import { Grid, Segment, ControlLine, Text } from '@/components'
import Link from 'next/link'

const AdminPage = () => {
  return (
    <div className="dashboard px-10 w-full">
      <Segment className="mt-4">
        <Segment>
          <ControlLine
            content={
              <>
                <Text name="사용자 이용 통계" className="text-white text-lg" />
              </>
            }
            controls={
              <Link
                href="/admin/dashboard/detail"
                className="text-white text-sm underline"
              >
                자세히보기
              </Link>
            }
          />
          <Grid>
            <Grid.Row>
              <Grid.Column>1.</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <ControlLine
            content={
              <>
                <Text name="컨텐츠" className="text-white text-lg" />
              </>
            }
            controls={
              <Link
                href="/admin/management"
                className="text-white text-sm underline"
              >
                자세히보기
              </Link>
            }
          />
          <Grid>
            <Grid.Row>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    </div>
  )
}

export default AdminPage
