import os
from django.contrib.gis.utils import LayerMapping
from .models import Counties
from .models import Elevenkvmvlines
from .models import Generationplants
from .models import Primarysubstations
from .models import Secondarysubstations
from .models import Thirtythreekvmvlines
from .models import Transmissionlines
from .models import Transmissionsubstations

counties_mapping = {
    'name' : 'NAME',
    'shape_leng' : 'Shape_Leng',
    'shape_area' : 'Shape_Area',
    'geom' : 'MULTIPOLYGON',
}
county_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/counties.shp'))

def run(verbose=True):
	lm = LayerMapping(Counties, county_shp, counties_mapping, transform= False, encoding='iso-8859-1')
	lm.save(strict=True,verbose=verbose)



elevenkvmvlines_mapping = {
    'county' : 'County',
    'internalel' : 'InternalEl',
    'controlcen' : 'ControlCen',
    'primarysub' : 'PrimarySub',
    'primaryfee' : 'PrimaryFee',
    'feederleng' : 'FeederLeng',
    'typeofsect' : 'TypeofSect',
    'linevoltag' : 'LineVoltag',
    'numberofph' : 'NumberofPh',
    'geom' : 'MULTILINESTRING',

}

elevenkvmvline_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/elevenkvmvline.shp'))

def run(verbose=True):
	lm = LayerMapping(Elevenkvmvlines, elevenkvmvline_shp, elevenkvmvlines_mapping, transform= False, encoding='iso-8859-1')
	lm.save(strict=True,verbose=verbose)

generationplants_mapping = {
    'name' : 'Name',
    'capacity' : 'Capacity',
    'geom' : 'MULTIPOINT',
}

generationplant_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/generationplant.shp'))

def run(verbose=True):
    lm = LayerMapping(Generationplants, generationplant_shp, generationplants_mapping, transform= False, encoding='iso-8859-1')
    lm.save(strict=True,verbose=verbose)

	

primarysubstations_mapping = {
    'county' : 'County',
    'internalpr' : 'InternalPr',
    'primarysub' : 'PrimarySub',
    'ownership' : 'Ownership',
    'physicallo' : 'PhysicalLo',
    'incomingvo' : 'IncomingVo',
    'outgoingvo' : 'OutgoingVo',
    'plotnumber' : 'PlotNumber',
    'manned' : 'Manned',
    'geom' : 'MULTIPOINT',
}


primarysubstation_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/primarysubstation.shp'))

def run(verbose=True):
	lm = LayerMapping(Primarysubstations, primarysubstation_shp, primarysubstations_mapping, transform= False, encoding='iso-8859-1')
	lm.save(strict=True,verbose=verbose)



secondarysubstations_mapping = {
    'name' : 'NAME',
    'substation' : 'Substation',
    'primaryfee' : 'PrimaryFee',
    'primaysubs' : 'PrimaySubs',
    'county' : 'County',
    'internalsb' : 'InternalSb',
    'customerss' : 'CustomersS',
    'physicallo' : 'PhysicalLo',
    'geom' : 'MULTIPOINT',
}



secondarysubstation_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/secondarysubstation.shp'))

def run(verbose=True):
	lm = LayerMapping(Secondarysubstations, secondarysubstation_shp, secondarysubstations_mapping, transform= False, encoding='iso-8859-1')
	lm.save(strict=True,verbose=verbose)


thirtythreekvmvlines_mapping = {
    'primaryfee' : 'PrimaryFee',
    'primarysub' : 'PrimarySub',
    'county' : 'County',
    'internaltt' : 'InternalTt',
    'typeofsect' : 'TypeofSect',
    'feederleng' : 'FeederLeng',
    'numberofph' : 'NumberofPh',
    'linevoltag' : 'LineVoltag',
    'geom' : 'MULTILINESTRING',
}



thirtythreekvmvline_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/thirtythreekvmvline.shp'))

def run(verbose=True):
	lm = LayerMapping(Thirtythreekvmvlines, thirtythreekvmvline_shp, thirtythreekvmvlines_mapping, transform= False, encoding='iso-8859-1')
	lm.save(strict=True,verbose=verbose)


transmissionlines_mapping = {
    'transfeede' : 'TransFeede',
    'transsubta' : 'TransSubta',
    'internaltl' : 'InternalTl',
    'county' : 'County',
    'typeofsect' : 'TypeofSect',
    'feederleng' : 'FeederLeng',
    'linevoltag' : 'LineVoltag',
    'numberofph' : 'NumberofPh',
    'geom' : 'MULTILINESTRING',
}


transmissionline_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/transmissionline.shp'))

def run(verbose=True):
	lm = LayerMapping(Transmissionlines, transmissionline_shp, transmissionlines_mapping, transform= False, encoding='iso-8859-1')
	lm.save(strict=True,verbose=verbose)



transmissionsubstations_mapping = {
    'name' : 'Name',
    'incomingfe' : 'IncomingFe',
    'outgoingfe' : 'OutgoingFe',
    'county' : 'County',
    'internaltb' : 'InternalTb',
    'ownership' : 'Ownership',
    'physicallo' : 'PhysicalLo',
    'plotnumber' : 'PlotNumber',
    'manned' : 'Manned',
    'geom' : 'MULTIPOINT',
}


transmissionsubstation_shp = os.path .abspath(os.path.join(os.path.dirname(__file__),'data/transmissionsubstation.shp'))

def run(verbose=True):
	lm = LayerMapping(Transmissionsubstations, transmissionsubstation_shp, transmissionsubstations_mapping, transform= False, encoding='iso-8859-1')
	lm.save(strict=True,verbose=verbose)




