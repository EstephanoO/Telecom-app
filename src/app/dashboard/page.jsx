'use client'

import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import ChartPage from './chart';
import settings from '@/libs/settings'
import axios from 'axios'

const API_URL = settings.apiUrl;

const PlaygroundPage = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${API_URL}/formularios`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchFormData();
  }, []);

  const dpFormData = formData.filter((formulario) => formulario.TipoTrabajo === 'DP');
  const rpFormData = formData.filter((formulario) => formulario.TipoTrabajo === 'RD');
  const raFormData = formData.filter((formulario) => formulario.TipoTrabajo === 'RA');
  const bbFormData = formData.filter((formulario) => formulario.TipoTrabajo === 'BACKBONE');
  const instFormData = formData.filter((formulario) => formulario.TipoTrabajo === 'INSTALACIONES');
  const actFormData = formData.filter((formulario) => formulario.TipoTrabajo === 'ACTIVACIONES');
  const today = new Date();
  const oneDayAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const dpFormDataToday = dpFormData.filter((formulario) => new Date(formulario.Fecha) >= oneDayAgo);
  const dpFormDataOneWeek = dpFormData.filter((formulario) => new Date(formulario.Fecha) >= oneWeekAgo);
  const dpFormDataOneMonth = dpFormData.filter((formulario) => new Date(formulario.Fecha) >= oneMonthAgo);

  const rpFormDataToday = rpFormData.filter((formulario) => new Date(formulario.Fecha) >= oneDayAgo);
  const rpFormDataOneWeek = rpFormData.filter((formulario) => new Date(formulario.Fecha) >= oneWeekAgo);
  const rpFormDataOneMonth = rpFormData.filter((formulario) => new Date(formulario.Fecha) >= oneMonthAgo);

  const raFormDataToday = raFormData.filter((formulario) => new Date(formulario.Fecha) >= oneDayAgo);
  const raFormDataOneWeek = raFormData.filter((formulario) => new Date(formulario.Fecha) >= oneWeekAgo);
  const raFormDataOneMonth = raFormData.filter((formulario) => new Date(formulario.Fecha) >= oneMonthAgo);

  const bbFormDataToday = bbFormData.filter((formulario) => new Date(formulario.Fecha) >= oneDayAgo);
  const bbFormDataOneWeek = bbFormData.filter((formulario) => new Date(formulario.Fecha) >= oneWeekAgo);
  const bbFormDataOneMonth = bbFormData.filter((formulario) => new Date(formulario.Fecha) >= oneMonthAgo);

  const dpMetrosOneMonth = dpFormDataOneMonth.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);

  const rpMetrosToday = rpFormDataToday.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);
  const rpMetrosOneWeek = rpFormDataOneWeek.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);
  const rpMetrosOneMonth = rpFormDataOneMonth.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);

  const raMetrosToday = raFormDataToday.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);
  const raMetrosOneWeek = raFormDataOneWeek.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);
  const raMetrosOneMonth = raFormDataOneMonth.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);

  const bbMetrosToday = bbFormDataToday.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);
  const bbMetrosOneWeek = bbFormDataOneWeek.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);
  const bbMetrosOneMonth = bbFormDataOneMonth.reduce((total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10), 0);

  const dpFormulariosOneWeek = dpFormDataOneWeek.length;
  const dpFormulariosOneMonth = dpFormDataOneMonth.length;

  const rpFormulariosToday = rpFormDataToday.length;
  const rpFormulariosOneWeek = rpFormDataOneWeek.length;
  const rpFormulariosOneMonth = rpFormDataOneMonth.length;

  const raFormulariosToday = raFormDataToday.length;
  const raFormulariosOneWeek = raFormDataOneWeek.length;
  const raFormulariosOneMonth = raFormDataOneMonth.length;

  const bbFormulariosToday = bbFormDataToday.length;
  const bbFormulariosOneWeek = bbFormDataOneWeek.length;
  const bbFormulariosOneMonth = bbFormDataOneMonth.length;

  const instFormulariosToday = instFormData.filter((formulario) => new Date(formulario.Fecha) >= oneDayAgo).length;
  const instFormulariosOneWeek = instFormData.filter((formulario) => new Date(formulario.Fecha) >= oneWeekAgo).length;
  const instFormulariosOneMonth = instFormData.filter((formulario) => new Date(formulario.Fecha) >= oneMonthAgo).length;

  const actFormulariosToday = actFormData.filter((formulario) => new Date(formulario.Fecha) >= oneDayAgo).length;
  const actFormulariosOneWeek = actFormData.filter((formulario) => new Date(formulario.Fecha) >= oneWeekAgo).length;
  const actFormulariosOneMonth = actFormData.filter((formulario) => new Date(formulario.Fecha) >= oneMonthAgo).length;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card title="DP">
            <div>
              <div>
                <Statistic title="DP semanal" value={dpFormulariosOneWeek} />
              </div>
            </div>
            <div>
              <div>
                <Statistic title="al mes" value={dpMetrosOneMonth} suffix=" m" />
              </div>
              <div>
                <Statistic title="DP al mes" value={dpFormulariosOneMonth} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="RD">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="Hoy" value={rpMetrosToday} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="RD hoy" value={rpFormulariosToday} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="semanal" value={rpMetrosOneWeek} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="RD semanal" value={rpFormulariosOneWeek} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="al mes" value={rpMetrosOneMonth} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="RD al mes" value={rpFormulariosOneMonth} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="RA">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="Hoy" value={raMetrosToday} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="RA hoy" value={raFormulariosToday} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="semanal" value={raMetrosOneWeek} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="RA semanal" value={raFormulariosOneWeek} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="al mes" value={raMetrosOneMonth} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="RA al mes" value={raFormulariosOneMonth} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="BackBone">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="Hoy" value={bbMetrosToday} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="BB hoy" value={bbFormulariosToday} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="semanal" value={bbMetrosOneWeek} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="BB semanal" value={bbFormulariosOneWeek} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="al mes" value={bbMetrosOneMonth} suffix=" m" />
              </div>
              <div style={{ width: '50%' }}>
              <Statistic title="BB al mes" value={bbFormulariosOneMonth} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Instalaciones">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="Instalaciones hoy" value={instFormulariosToday} />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="Instalaciones semanal" value={instFormulariosOneWeek} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="Instalaciones al mes" value={instFormulariosOneMonth} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Activaciones">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="Activaciones hoy" value={actFormulariosToday} />
              </div>
              <div style={{ width: '50%' }}>
                <Statistic title="Activaciones semanal" value={actFormulariosOneWeek} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <Statistic title="Activaciones al mes" value={actFormulariosOneMonth} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <ChartPage />
    </main>
  );
};

export default PlaygroundPage;